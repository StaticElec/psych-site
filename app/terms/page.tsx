import type { Metadata } from "next";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = siteContent.metadata.pages.legal;

export default function TermsPage() {
  const { legalPage } = siteContent;

  return (
    <main className="content-page wrap legal-page">
      <section id="terms"><h1>{legalPage.termsHeading}</h1><div className="rule" />{legalPage.termsSections.map((section) => <article key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>)}</section>
      <section id="privacy"><h1>{legalPage.privacyHeading}</h1><div className="rule" />{legalPage.privacyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    </main>
  );
}
