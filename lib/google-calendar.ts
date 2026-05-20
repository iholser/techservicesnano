import { google, calendar_v3 } from "googleapis";
import { JWT } from "google-auth-library";
import { getSchedulingConfig } from "./scheduling-config";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

function getClient(): calendar_v3.Calendar {
  const cfg = getSchedulingConfig();
  const auth = new JWT({
    email: cfg.serviceAccountEmail,
    key: cfg.serviceAccountPrivateKey.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  });
  return google.calendar({ version: "v3", auth });
}

export type BusyRange = { start: Date; end: Date };

export async function getBusyRanges(
  timeMin: Date,
  timeMax: Date,
): Promise<BusyRange[]> {
  const cfg = getSchedulingConfig();
  const calendar = getClient();
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: cfg.timezone,
      items: [{ id: cfg.calendarId }],
    },
  });
  const busy = res.data.calendars?.[cfg.calendarId]?.busy ?? [];
  return busy
    .filter((b) => b.start && b.end)
    .map((b) => ({ start: new Date(b.start!), end: new Date(b.end!) }));
}

export type CreateEventInput = {
  start: Date;
  end: Date;
  summary: string;
  description: string;
  customerEmail: string;
  customerName: string;
};

export async function createBookingEvent(
  input: CreateEventInput,
): Promise<{ id: string; htmlLink: string }> {
  const cfg = getSchedulingConfig();
  const calendar = getClient();
  const res = await calendar.events.insert({
    calendarId: cfg.calendarId,
    sendUpdates: "none",
    requestBody: {
      summary: input.summary,
      description: input.description,
      start: { dateTime: input.start.toISOString(), timeZone: cfg.timezone },
      end: { dateTime: input.end.toISOString(), timeZone: cfg.timezone },
    },
  });
  if (!res.data.id) {
    throw new Error("Calendar event creation returned no id");
  }
  return { id: res.data.id, htmlLink: res.data.htmlLink ?? "" };
}

export async function getBookingEvent(
  eventId: string,
): Promise<calendar_v3.Schema$Event | null> {
  const cfg = getSchedulingConfig();
  const calendar = getClient();
  try {
    const res = await calendar.events.get({
      calendarId: cfg.calendarId,
      eventId,
    });
    return res.data;
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: number }).code === 404
    ) {
      return null;
    }
    throw err;
  }
}

export async function deleteBookingEvent(eventId: string): Promise<void> {
  const cfg = getSchedulingConfig();
  const calendar = getClient();
  await calendar.events.delete({
    calendarId: cfg.calendarId,
    eventId,
    sendUpdates: "none",
  });
}
