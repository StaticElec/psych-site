"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/content/site-content";
import { CONTACT_API_URL } from "@/lib/contact-config";

function countWords(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const submissionInProgress = useRef(false);
  const { form } = siteContent.contactPage;
  const wordsRemaining = form.wordLimit - countWords(message);

  function updateMessage(value: string) {
    if (countWords(value) <= form.wordLimit) setMessage(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const formElement = event.currentTarget;
    const fields = new FormData(formElement);
    const name = String(fields.get("name") ?? "").trim();
    const phone = String(fields.get("phone") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const messageText = String(fields.get("message") ?? "").trim();
    const website = String(fields.get("website") ?? "");
    if (!name || !phone || !email || !messageText || name.length > 120 ||
      phone.length > 40 || email.length > 254 || messageText.length > 4000 ||
      countWords(messageText) > form.wordLimit ||
      !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i.test(email) ||
      !/^\+?[0-9().\s-]+$/.test(phone) || (phone.match(/\d/g)?.length ?? 0) < 7) {
      setStatus({ type: "error", text: form.validationError });
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message: messageText, website }),
      });
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object" ||
        !("success" in result) || result.success !== true) throw new Error("Contact request failed");

      formElement.reset();
      setMessage("");
      setStatus({ type: "success", text: form.successMessage });
    } catch {
      setStatus({ type: "error", text: form.sendError });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <label>{form.fullNameLabel}<input name="name" type="text" autoComplete="name" maxLength={120} required /></label>
      <label>{form.phoneLabel}<input name="phone" type="tel" autoComplete="tel" maxLength={40} required /></label>
      <label>{form.emailLabel}<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <label className="message-field">{form.messageLabel}
        <span className="textarea-wrap">
          <textarea name="message" value={message} onChange={(event) => updateMessage(event.target.value)} rows={9} maxLength={4000} required />
          {!message && <span className="word-limit-placeholder" aria-hidden="true">{form.wordLimitLabel}</span>}
          <span className="words-remaining" aria-live="polite">{wordsRemaining} {form.wordsRemainingLabel}</span>
        </span>
      </label>
      <div className="contact-honeypot" aria-hidden="true">
        <label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <Button type="submit" className="contact-submit" disabled={isSubmitting}><span className="button-label">{isSubmitting ? form.sendingLabel : form.submitLabel}</span></Button>
      {status && <p className={`contact-status contact-status--${status.type}`} role={status.type === "error" ? "alert" : "status"}>{status.text}</p>}
    </form>
  );
}
