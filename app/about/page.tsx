import type { Metadata } from "next";
import { ImageSlot } from "@/components/image-slot";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = siteContent.metadata.pages.about;

export default function AboutPage() {
  const { aboutPage, images } = siteContent;

  return (
    <main className="content-page wrap about-page">
      <div className="prose about-copy">
        <figure className="portrait-figure"><ImageSlot {...images.aboutPage.clinicianPortrait} priority /><figcaption>{aboutPage.portraitCaption}</figcaption></figure>
        {aboutPage.biographyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </main>
  );
}
