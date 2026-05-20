import type { SchedulingConfig } from "./scheduling-config";

type MailMessage = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

async function sendViaResend(
  msg: MailMessage,
  cfg: SchedulingConfig,
): Promise<void> {
  const { Resend } = await import("resend");
  const resend = new Resend(cfg.resendApiKey!);
  const res = await resend.emails.send(msg);
  if (res.error) {
    throw new Error(`Resend error: ${res.error.message}`);
  }
}

async function sendViaGmail(
  msg: MailMessage,
  cfg: SchedulingConfig,
): Promise<void> {
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: cfg.gmailUser!,
      pass: cfg.gmailAppPassword!,
    },
  });
  await transporter.sendMail(msg);
}

export async function sendEmail(
  msg: MailMessage,
  cfg: SchedulingConfig,
): Promise<void> {
  if (cfg.emailProvider === "gmail") {
    await sendViaGmail(msg, cfg);
  } else {
    await sendViaResend(msg, cfg);
  }
}
