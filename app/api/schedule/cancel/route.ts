import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getSchedulingConfig,
  isSchedulingConfigured,
} from "@/lib/scheduling-config";
import {
  deleteBookingEvent,
  getBookingEvent,
} from "@/lib/google-calendar";
import { verifyCancelToken } from "@/lib/scheduling-token";
import { sendCancellationEmails } from "@/lib/scheduling-email";
import { getService, services } from "@/lib/services";

export const dynamic = "force-dynamic";

const BodySchema = z.object({ token: z.string().min(1) });

function inferServiceFromSummary(summary: string | null | undefined) {
  if (!summary) return undefined;
  const match = services.find((s) => summary.startsWith(s.title));
  return match ?? getService("tune-up");
}

export async function POST(req: Request) {
  if (!isSchedulingConfigured()) {
    return new NextResponse(null, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const cfg = getSchedulingConfig();
  const bookingId = verifyCancelToken(parsed.data.token, cfg.secret);
  if (!bookingId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  try {
    const event = await getBookingEvent(bookingId);
    if (!event) {
      return NextResponse.json({ ok: true, alreadyCanceled: true });
    }

    await deleteBookingEvent(bookingId);

    const start =
      event.start?.dateTime ?? event.start?.date ?? null;
    const customerEmail = (event.description ?? "")
      .split("\n")
      .map((l) => l.match(/^Email:\s*(.+)$/))
      .find(Boolean)?.[1];
    const customerName = (event.description ?? "")
      .split("\n")
      .map((l) => l.match(/^Customer:\s*(.+)$/))
      .find(Boolean)?.[1];
    const service = inferServiceFromSummary(event.summary);

    if (start && customerEmail && customerName && service) {
      try {
        await sendCancellationEmails({
          service,
          startUtc: new Date(start),
          customerName,
          customerEmail,
        });
      } catch (e) {
        console.error("[scheduling] cancel email failed", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[scheduling] cancel error", err);
    return NextResponse.json(
      { error: "Failed to cancel" },
      { status: 500 },
    );
  }
}
