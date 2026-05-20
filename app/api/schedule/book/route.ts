import { NextResponse } from "next/server";
import { z } from "zod";
import { addMinutes } from "date-fns";
import {
  getSchedulingConfig,
  isSchedulingConfigured,
} from "@/lib/scheduling-config";
import {
  createBookingEvent,
  getBusyRanges,
} from "@/lib/google-calendar";
import { getService } from "@/lib/services";
import { signCancelToken } from "@/lib/scheduling-token";
import { sendBookingEmails } from "@/lib/scheduling-email";
import { formatDateTimeForDisplay } from "@/lib/scheduling";
import {
  checkRateLimit,
  getClientKey,
} from "@/lib/scheduling-rate-limit";

export const dynamic = "force-dynamic";

const BodySchema = z.object({
  service: z.string().min(1),
  start: z.string().datetime(),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(40),
  address: z.string().max(300).optional(),
  notes: z.string().max(2000).optional(),
  hp: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  if (!isSchedulingConfigured()) {
    return new NextResponse(null, { status: 404 });
  }

  const rl = checkRateLimit(`book:${getClientKey(req)}`);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  if (parsed.data.hp && parsed.data.hp.length > 0) {
    return NextResponse.json({ error: "Rejected" }, { status: 400 });
  }

  const service = getService(parsed.data.service);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  const cfg = getSchedulingConfig();
  const start = new Date(parsed.data.start);
  const end = addMinutes(start, service.durationMinutes);

  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: "Invalid start time" }, { status: 400 });
  }

  try {
    const busy = await getBusyRanges(start, end);
    const overlaps = busy.some((b) => start < b.end && end > b.start);
    if (overlaps) {
      return NextResponse.json(
        { error: "Slot no longer available" },
        { status: 409 },
      );
    }

    const summary = `${service.title} — ${parsed.data.name}`;
    const description = [
      `Service: ${service.title}`,
      `Customer: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Phone: ${parsed.data.phone}`,
      parsed.data.address ? `Address: ${parsed.data.address}` : null,
      parsed.data.notes ? `\nNotes:\n${parsed.data.notes}` : null,
      `\nBooked via tech-services-nano.com`,
    ]
      .filter(Boolean)
      .join("\n");

    const event = await createBookingEvent({
      start,
      end,
      summary,
      description,
      customerEmail: parsed.data.email,
      customerName: parsed.data.name,
    });

    const token = signCancelToken(event.id, cfg.secret);
    const cancelUrl = `${cfg.siteUrl}/schedule/cancel/${token}`;

    try {
      await sendBookingEmails({
        service,
        startUtc: start,
        endUtc: end,
        customerName: parsed.data.name,
        customerEmail: parsed.data.email,
        customerPhone: parsed.data.phone,
        address: parsed.data.address,
        notes: parsed.data.notes,
        cancelUrl,
      });
    } catch (emailErr) {
      console.error("[scheduling] email failed", emailErr);
    }

    return NextResponse.json({
      bookingId: event.id,
      cancelUrl,
      whenLabel: formatDateTimeForDisplay(start, cfg),
    });
  } catch (err) {
    console.error("[scheduling] book error", err);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
