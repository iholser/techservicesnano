import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getSchedulingConfig,
  isSchedulingConfigured,
} from "@/lib/scheduling-config";
import { getBusyRanges } from "@/lib/google-calendar";
import { generateSlotWindowsForDate } from "@/lib/scheduling";
import { getService } from "@/lib/services";
import { fromZonedTime } from "date-fns-tz";
import { addDays } from "date-fns";

export const dynamic = "force-dynamic";

const QuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  service: z.string().min(1),
});

export async function GET(req: Request) {
  if (!isSchedulingConfigured()) {
    return new NextResponse(null, { status: 404 });
  }

  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    date: url.searchParams.get("date"),
    service: url.searchParams.get("service"),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const service = getService(parsed.data.service);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  const cfg = getSchedulingConfig();
  const dayStartUtc = fromZonedTime(
    `${parsed.data.date} 00:00:00`,
    cfg.timezone,
  );
  const dayEndUtc = addDays(dayStartUtc, 1);

  const maxDate = addDays(new Date(), cfg.maxDaysAhead);
  if (dayStartUtc > maxDate) {
    return NextResponse.json({ slots: [] });
  }

  try {
    const busy = await getBusyRanges(dayStartUtc, dayEndUtc);
    const windows = generateSlotWindowsForDate(
      parsed.data.date,
      service,
      busy,
      cfg,
    );
    return NextResponse.json(
      {
        slots: windows.map((w) => ({
          start: w.startUtc.toISOString(),
          end: w.endUtc.toISOString(),
          label: w.label,
        })),
      },
      { headers: { "Cache-Control": "private, max-age=30" } },
    );
  } catch (err) {
    console.error("[scheduling] slots error", err);
    return NextResponse.json({ error: "Failed to load slots" }, { status: 500 });
  }
}
