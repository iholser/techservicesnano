import { getSchedulingConfig } from "./scheduling-config";
import { sendEmail } from "./scheduling-mailer";
import { formatDateTimeForDisplay } from "./scheduling";
import type { Service } from "./services";

type BookingEmailInput = {
  service: Service;
  startUtc: Date;
  endUtc: Date;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address?: string;
  notes?: string;
  cancelUrl: string;
};

export async function sendBookingEmails(input: BookingEmailInput) {
  const cfg = getSchedulingConfig();
  const when = formatDateTimeForDisplay(input.startUtc, cfg);

  const customerText = `Hi ${input.customerName},

Your appointment with Tech Services Nano is confirmed.

Service: ${input.service.title}
When: ${when}
Estimated price: $${input.service.price}
Estimated duration: ${input.service.durationMinutes} minutes

We'll be in touch if anything changes. Need to cancel? Use this link:
${input.cancelUrl}

— Tech Services Nano`;

  const ownerText = `New booking:

Service: ${input.service.title}
When: ${when}
Duration: ${input.service.durationMinutes} minutes
Price: $${input.service.price}

Customer: ${input.customerName}
Email: ${input.customerEmail}
Phone: ${input.customerPhone}
${input.address ? `Address: ${input.address}\n` : ""}${input.notes ? `Notes: ${input.notes}\n` : ""}
Cancel link (admin): ${input.cancelUrl}`;

  await Promise.all([
    sendEmail(
      {
        from: cfg.fromEmail,
        to: input.customerEmail,
        subject: `Appointment confirmed — ${input.service.title}`,
        text: customerText,
      },
      cfg,
    ),
    sendEmail(
      {
        from: cfg.fromEmail,
        to: cfg.ownerEmail,
        subject: `New booking: ${input.service.title} — ${input.customerName}`,
        text: ownerText,
      },
      cfg,
    ),
  ]);
}

export async function sendCancellationEmails(input: {
  service: Service;
  startUtc: Date;
  customerName: string;
  customerEmail: string;
}) {
  const cfg = getSchedulingConfig();
  const when = formatDateTimeForDisplay(input.startUtc, cfg);

  await Promise.all([
    sendEmail(
      {
        from: cfg.fromEmail,
        to: input.customerEmail,
        subject: `Appointment canceled — ${input.service.title}`,
        text: `Hi ${input.customerName},

Your ${input.service.title} appointment on ${when} has been canceled.

If this was a mistake, please book again at ${cfg.siteUrl}/schedule.

— Tech Services Nano`,
      },
      cfg,
    ),
    sendEmail(
      {
        from: cfg.fromEmail,
        to: cfg.ownerEmail,
        subject: `Booking canceled: ${input.service.title} — ${input.customerName}`,
        text: `Canceled: ${input.service.title} on ${when}\nCustomer: ${input.customerName} <${input.customerEmail}>`,
      },
      cfg,
    ),
  ]);
}
