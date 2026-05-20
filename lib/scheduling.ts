import { fromZonedTime, toZonedTime, formatInTimeZone } from "date-fns-tz";
import { addMinutes, addHours } from "date-fns";
import type { BusyRange } from "./google-calendar";
import type { SchedulingConfig } from "./scheduling-config";
import type { Service } from "./services";

export type SlotWindow = {
  startUtc: Date;
  endUtc: Date;
  label: string;
};

export function generateSlotWindowsForDate(
  dateIso: string,
  service: Service,
  busy: BusyRange[],
  config: SchedulingConfig,
  now: Date = new Date(),
): SlotWindow[] {
  const zonedDay = toZonedTime(new Date(`${dateIso}T12:00:00Z`), config.timezone);
  const weekday = zonedDay.getDay();
  if (!config.businessDays.includes(weekday)) return [];

  const dayStartUtc = fromZonedTime(
    `${dateIso} ${config.businessStart}`,
    config.timezone,
  );
  const dayEndUtc = fromZonedTime(
    `${dateIso} ${config.businessEnd}`,
    config.timezone,
  );

  const leadCutoff = addHours(now, config.leadTimeHours);

  const slots: SlotWindow[] = [];
  let cursor = dayStartUtc;
  while (true) {
    const slotEnd = addMinutes(cursor, service.durationMinutes);
    if (slotEnd.getTime() > dayEndUtc.getTime()) break;
    if (cursor.getTime() >= leadCutoff.getTime()) {
      const overlaps = busy.some(
        (b) => cursor < b.end && slotEnd > b.start,
      );
      if (!overlaps) {
        slots.push({
          startUtc: cursor,
          endUtc: slotEnd,
          label: formatInTimeZone(cursor, config.timezone, "HH:mm"),
        });
      }
    }
    cursor = addMinutes(cursor, service.durationMinutes);
  }

  // Silence the unused variable warning while keeping the helpful intermediate locals
  void dayStartZoned;
  void dayEndZoned;

  return slots;
}

export function formatSlotForDisplay(
  startUtc: Date,
  config: SchedulingConfig,
): string {
  return formatInTimeZone(startUtc, config.timezone, "h:mm a");
}

export function formatDateTimeForDisplay(
  d: Date,
  config: SchedulingConfig,
): string {
  return formatInTimeZone(
    d,
    config.timezone,
    "EEEE, MMMM d, yyyy 'at' h:mm a zzz",
  );
}
