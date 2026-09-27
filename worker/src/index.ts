import { Resend } from "resend";
import { buildContactEmail, type ContactData } from "./contact-email.ts";

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  CONTACT_FROM_NAME: string;
  CONTACT_SUBJECT_PREFIX: string;
  ALLOWED_ORIGIN: string;
}

const MAX_BODY_BYTES = 12_000;
const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const PHONE_PATTERN = /^\+?[0-9().\s-]+$/;
const FAILURE_MESSAGE = "Unable to send your message. Please try again.";

function isEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

function json(status: number, body: object, origin?: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
    },
  });
}

function cleanField(value: unknown, maxLength: number, multiline = false): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > maxLength) return null;
  if (multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(cleaned)
    : /[\u0000-\u001f\u007f]/.test(cleaned)) return null;
  return cleaned;
}

function validateForm(value: unknown): ContactData | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const name = cleanField(data.name, 120);
  const phone = cleanField(data.phone, 40);
  const email = cleanField(data.email, 254);
  const message = cleanField(data.message, 4000, true);
  if (!name || !phone || !email || !message || !isEmail(email)) return null;
  if (!PHONE_PATTERN.test(phone) || (phone.match(/\d/g)?.length ?? 0) < 7) return null;
  if (message.split(/\s+/).length > 500) return null;
  return { name, phone, email, message };
}

async function readBody(request: Request): Promise<string | null> {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function validConfig(env: Env): boolean {
  const allowedOrigin = env.ALLOWED_ORIGIN;
  try {
    const parsed = new URL(allowedOrigin);
    if (parsed.origin !== allowedOrigin || !["http:", "https:"].includes(parsed.protocol)) return false;
  } catch {
    return false;
  }
  return Boolean(env.RESEND_API_KEY)
    && isEmail(env.CONTACT_TO_EMAIL ?? "")
    && isEmail(env.CONTACT_FROM_EMAIL ?? "")
    && typeof env.CONTACT_FROM_NAME === "string"
    && env.CONTACT_FROM_NAME.trim().length > 0
    && env.CONTACT_FROM_NAME.length <= 100
    && !/[\u0000-\u001f\u007f<>"\\]/.test(env.CONTACT_FROM_NAME)
    && typeof env.CONTACT_SUBJECT_PREFIX === "string"
    && env.CONTACT_SUBJECT_PREFIX.trim().length > 0
    && env.CONTACT_SUBJECT_PREFIX.length <= 100
    && !/[\u0000-\u001f\u007f]/.test(env.CONTACT_SUBJECT_PREFIX);
}

const contactWorker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") return json(404, { success: false, message: "Not found." });
    if (!validConfig(env)) return json(503, { success: false, message: FAILURE_MESSAGE });

    const allowedOrigin = env.ALLOWED_ORIGIN;
    const origin = request.headers.get("Origin");
    if (origin !== allowedOrigin) return json(403, { success: false, message: "Forbidden." });

    if (request.method === "OPTIONS") {
      if (request.headers.get("Access-Control-Request-Method") !== "POST") {
        return json(405, { success: false, message: "Method not allowed." }, allowedOrigin);
      }
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
          Vary: "Origin",
        },
      });
    }
    if (request.method !== "POST") {
      const response = json(405, { success: false, message: "Method not allowed." }, allowedOrigin);
      response.headers.set("Allow", "POST, OPTIONS");
      return response;
    }
    if (request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return json(415, { success: false, message: "Please send JSON." }, allowedOrigin);
    }
    if (!request.body) return json(400, { success: false, message: "Invalid request." }, allowedOrigin);
    const length = Number(request.headers.get("Content-Length"));
    if (Number.isFinite(length) && length > MAX_BODY_BYTES) {
      return json(413, { success: false, message: "Message is too large." }, allowedOrigin);
    }

    let payload: unknown;
    try {
      const body = await readBody(request);
      if (body === null) return json(413, { success: false, message: "Message is too large." }, allowedOrigin);
      payload = JSON.parse(body);
    } catch {
      return json(400, { success: false, message: "Invalid request." }, allowedOrigin);
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return json(400, { success: false, message: "Invalid request." }, allowedOrigin);
    }
    const raw = payload as Record<string, unknown>;
    if (typeof raw.website !== "string" && raw.website !== undefined) {
      return json(400, { success: false, message: "Invalid request." }, allowedOrigin);
    }
    // Honeypot: act successful, but never deliver a bot-filled submission.
    if (raw.website) return json(200, { success: true }, allowedOrigin);

    const data = validateForm(raw);
    if (!data) return json(400, { success: false, message: "Please check the form fields and try again." }, allowedOrigin);

    try {
      const email = buildContactEmail(data, env.CONTACT_SUBJECT_PREFIX.trim());
      const resend = new Resend(env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: `${env.CONTACT_FROM_NAME.trim()} <${env.CONTACT_FROM_EMAIL}>`,
        to: [env.CONTACT_TO_EMAIL],
        replyTo: data.email,
        ...email,
      });
      if (error) return json(502, { success: false, message: FAILURE_MESSAGE }, allowedOrigin);
      return json(200, { success: true }, allowedOrigin);
    } catch {
      return json(502, { success: false, message: FAILURE_MESSAGE }, allowedOrigin);
    }
  },
};

export default contactWorker;
