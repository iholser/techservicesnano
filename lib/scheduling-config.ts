const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
type DayName = (typeof DAY_NAMES)[number];

export type EmailProvider = "resend" | "gmail";

export type SchedulingConfig = {
  calendarId: string;
  serviceAccountEmail: string;
  serviceAccountPrivateKey: string;
  emailProvider: EmailProvider;
  resendApiKey?: string;
  gmailUser?: string;
  gmailAppPassword?: string;
  fromEmail: string;
  ownerEmail: string;
  secret: string;
  timezone: string;
  businessStart: string;
  businessEnd: string;
  businessDays: number[];
  leadTimeHours: number;
  maxDaysAhead: number;
  siteUrl: string;
};

function readEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim().length > 0 ? v : undefined;
}

function getEmailProvider(): EmailProvider {
  const raw = readEnv("EMAIL_PROVIDER") ?? "resend";
  return raw === "gmail" ? "gmail" : "resend";
}

function isEmailConfigured(provider: EmailProvider): boolean {
  if (provider === "gmail") {
    return Boolean(readEnv("GMAIL_USER") && readEnv("GMAIL_APP_PASSWORD"));
  }
  return Boolean(readEnv("RESEND_API_KEY") && readEnv("SCHEDULING_FROM_EMAIL"));
}

export function isSchedulingConfigured(): boolean {
  const provider = getEmailProvider();
  return Boolean(
    readEnv("GOOGLE_CALENDAR_ID") &&
      readEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL") &&
      readEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY") &&
      readEnv("SCHEDULING_SECRET") &&
      isEmailConfigured(provider),
  );
}

function parseBusinessHours(raw: string): { start: string; end: string } {
  const match = raw.match(/^(\d{2}:\d{2})-(\d{2}:\d{2})$/);
  if (!match) return { start: "09:00", end: "17:00" };
  return { start: match[1], end: match[2] };
}

function parseBusinessDays(raw: string): number[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .map((s) => DAY_NAMES.indexOf(s as DayName))
    .filter((i) => i >= 0);
}

export function getSchedulingConfig(): SchedulingConfig {
  if (!isSchedulingConfigured()) {
    throw new Error("Scheduling is not configured");
  }
  const provider = getEmailProvider();
  const hours = parseBusinessHours(
    readEnv("SCHEDULING_BUSINESS_HOURS") ?? "09:00-17:00",
  );
  const days = parseBusinessDays(
    readEnv("SCHEDULING_BUSINESS_DAYS") ?? "Mon,Tue,Wed,Thu,Fri",
  );

  const gmailUser = readEnv("GMAIL_USER");
  const fromEmail =
    readEnv("SCHEDULING_FROM_EMAIL") ??
    (provider === "gmail" ? gmailUser! : undefined)!;

  return {
    calendarId: readEnv("GOOGLE_CALENDAR_ID")!,
    serviceAccountEmail: readEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL")!,
    serviceAccountPrivateKey: readEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY")!,
    emailProvider: provider,
    resendApiKey: readEnv("RESEND_API_KEY"),
    gmailUser,
    gmailAppPassword: readEnv("GMAIL_APP_PASSWORD"),
    fromEmail,
    ownerEmail: readEnv("SCHEDULING_OWNER_EMAIL") ?? fromEmail,
    secret: readEnv("SCHEDULING_SECRET")!,
    timezone: readEnv("SCHEDULING_TIMEZONE") ?? "America/Los_Angeles",
    businessStart: hours.start,
    businessEnd: hours.end,
    businessDays: days.length > 0 ? days : [1, 2, 3, 4, 5],
    leadTimeHours: Number(readEnv("SCHEDULING_LEAD_TIME_HOURS") ?? "24"),
    maxDaysAhead: Number(readEnv("SCHEDULING_MAX_DAYS_AHEAD") ?? "30"),
    siteUrl: readEnv("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  };
}
