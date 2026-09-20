import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="content-page wrap contact-page">
      <h1 className="sr-only">Request a Consultation</h1>
      <ContactForm />
    </main>
  );
}
