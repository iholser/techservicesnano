import { createHmac, timingSafeEqual } from "node:crypto";

function base64url(buf: Buffer | string): string {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/=+$/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function fromBase64url(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export function signCancelToken(bookingId: string, secret: string): string {
  const payload = base64url(bookingId);
  const sig = base64url(
    createHmac("sha256", secret).update(payload).digest(),
  );
  return `${payload}.${sig}`;
}

export function verifyCancelToken(
  token: string,
  secret: string,
): string | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = createHmac("sha256", secret).update(payload).digest();
  const provided = fromBase64url(sig);
  if (expected.length !== provided.length) return null;
  if (!timingSafeEqual(expected, provided)) return null;
  return fromBase64url(payload).toString("utf8");
}
