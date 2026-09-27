import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = siteContent.metadata.pages.contact;

export default function ContactPage() {
  return (
    <main className="content-page wrap contact-page">
      <h1 className="sr-only">{siteContent.contactPage.heading}</h1>
      <ContactForm />
    </main>
  );
}
