import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = siteContent.metadata.pages.fees;

export default function FeesPage() {
  const { feesPage, images, sharedLabels } = siteContent;

  return (
    <main className="content-page wrap fees-page">
      <ImageSlot {...images.feesPage.growth} className="fees-image" priority />
      <div className="fees-intro prose">{feesPage.introductionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      {feesPage.sessions.map((session) => <div className="fee-card" key={session.name}><strong>{session.name}</strong><span>{session.price} / {session.duration}</span></div>)}
      <section className="fees-details">
        <h1>{feesPage.insurance.heading}</h1>
        {feesPage.insurance.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h2>{feesPage.payment.heading}</h2><p>{feesPage.payment.description}</p>
      </section>
      <Link className="primary-cta" href="/contact"><span className="button-label">{sharedLabels.scheduleConsultation}</span></Link>
    </main>
  );
}
