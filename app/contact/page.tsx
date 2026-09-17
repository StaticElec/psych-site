import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="content-page wrap contact-page">
      <h1 className="sr-only">Request a Consultation</h1>
      <form className="contact-form">
        <label>Full Name<input name="name" type="text" autoComplete="name" required /></label>
        <label>Phone Number<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label>Email Address<input name="email" type="email" autoComplete="email" required /></label>
        <label>Tell me about yourself and best time to reach you<textarea name="message" maxLength={3000} rows={9} required /><span>500 word limit</span></label>
        <Button type="button" className="contact-submit" disabled title="Form delivery will be connected in a later step">Request Consultation</Button>
      </form>
    </main>
  );
}
