"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const WORD_LIMIT = 500;

function countWords(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

export function ContactForm() {
  const [message, setMessage] = useState("");
  const wordsRemaining = WORD_LIMIT - countWords(message);

  function updateMessage(value: string) {
    if (countWords(value) <= WORD_LIMIT) setMessage(value);
  }

  return (
    <form className="contact-form">
      <label>Full Name<input name="name" type="text" autoComplete="name" required /></label>
      <label>Phone Number<input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Email Address<input name="email" type="email" autoComplete="email" required /></label>
      <label className="message-field">Tell me about yourself and best time to reach you
        <span className="textarea-wrap">
          <textarea name="message" value={message} onChange={(event) => updateMessage(event.target.value)} rows={9} required />
          {!message && <span className="word-limit-placeholder" aria-hidden="true">500 word limit</span>}
          <span className="words-remaining" aria-live="polite">{wordsRemaining} words remaining</span>
        </span>
      </label>
      <Button type="button" className="contact-submit" disabled title="Form delivery will be connected in a later step">Request Consultation</Button>
    </form>
  );
}
