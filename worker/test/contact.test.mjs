import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.ts";
import { buildContactEmail } from "../src/contact-email.ts";

const env = {
  RESEND_API_KEY: "re_test_only",
  CONTACT_TO_EMAIL: "owner@example.com",
  CONTACT_FROM_EMAIL: "contact@example.com",
  CONTACT_FROM_NAME: "Website Contact Form",
  CONTACT_SUBJECT_PREFIX: "Website Inquiry",
  ALLOWED_ORIGIN: "http://localhost:5173,http://127.0.0.1:5173",
};
const validForm = {
  name: "Jane Smith",
  phone: "(555) 123-4567",
  email: "jane@example.com",
  message: "I would like to talk.",
  website: "",
};

function request(body, origin = "http://localhost:5173") {
  return new Request("http://localhost:8787/api/contact", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("email template escapes visitor text and includes a plain-text version", () => {
  const email = buildContactEmail({ ...validForm, name: "<Jane & Co>", message: "First\n<script>alert(1)</script>" }, "Inquiry", new Date("2026-09-25T12:00:00Z"));
  assert.equal(email.subject, "Inquiry — <Jane & Co>");
  assert.match(email.html, /&lt;Jane &amp; Co&gt;/);
  assert.match(email.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(email.html, /<script>/);
  assert.match(email.text, /First\n<script>alert\(1\)<\/script>/);
  assert.match(email.text, /September 25, 2026/);
});

test("preflight accepts each configured origin and POST", async () => {
  for (const origin of ["http://localhost:5173", "http://127.0.0.1:5173"]) {
    const preflight = new Request("http://localhost:8787/api/contact", {
      method: "OPTIONS",
      headers: { Origin: origin, "Access-Control-Request-Method": "POST" },
    });
    const allowed = await worker.fetch(preflight, env);
    assert.equal(allowed.status, 204);
    assert.equal(allowed.headers.get("Access-Control-Allow-Origin"), origin);
    assert.equal(allowed.headers.get("Access-Control-Allow-Methods"), "POST, OPTIONS");
  }

  const blocked = await worker.fetch(request(validForm, "https://elsewhere.example"), env);
  assert.equal(blocked.status, 403);
  assert.equal(blocked.headers.get("Access-Control-Allow-Origin"), null);
});

test("invalid input and oversized payloads are rejected before sending", async () => {
  for (const body of [
    { ...validForm, email: "bad@example.com\r\nBcc: bot@example.com" },
    { ...validForm, phone: "abc" },
    { ...validForm, name: "x".repeat(121) },
    { ...validForm, message: "word ".repeat(501) },
  ]) {
    const response = await worker.fetch(request(body), env);
    assert.equal(response.status, 400);
  }
  const large = await worker.fetch(request({ ...validForm, message: "x".repeat(13_000) }), env);
  assert.equal(large.status, 413);

  const malformed = await worker.fetch(new Request("http://localhost:8787/api/contact", {
    method: "POST",
    headers: { Origin: "http://localhost:5173", "Content-Type": "application/json" },
    body: "{not json",
  }), env);
  assert.equal(malformed.status, 400);

  const get = await worker.fetch(new Request("http://localhost:8787/api/contact", {
    method: "GET",
    headers: { Origin: "http://localhost:5173" },
  }), env);
  assert.equal(get.status, 405);
  assert.equal(get.headers.get("Allow"), "POST, OPTIONS");
});

test("honeypot submissions succeed without calling Resend", async () => {
  const response = await worker.fetch(request({ ...validForm, website: "spam.example" }), env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
});

test("valid submission sends both formats with configured addresses and visitor Reply-To", async () => {
  const originalFetch = globalThis.fetch;
  let sent;
  globalThis.fetch = async (_url, options) => {
    sent = JSON.parse(options.body);
    return Response.json({ id: "email-test" });
  };
  try {
    const response = await worker.fetch(request(validForm), env);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(sent.from, "Website Contact Form <contact@example.com>");
    assert.deepEqual(sent.to, ["owner@example.com"]);
    assert.equal(sent.reply_to, "jane@example.com");
    assert.equal(sent.subject, "Website Inquiry — Jane Smith");
    assert.match(sent.html, /Jane Smith/);
    assert.match(sent.text, /Jane Smith/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Resend failures return a generic response", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ name: "validation_error", message: "Private provider detail" }, { status: 422 });
  try {
    const response = await worker.fetch(request(validForm), env);
    assert.equal(response.status, 502);
    const body = await response.text();
    assert.doesNotMatch(body, /Private provider detail/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
