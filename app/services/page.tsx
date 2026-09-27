import type { Metadata } from "next";
import { ImageSlot } from "@/components/image-slot";
import { MoreServices } from "@/components/more-services";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = siteContent.metadata.pages.services;

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

export default function ServicesPage() {
  const { servicesPage, images } = siteContent;

  return (
    <main className="content-page wrap services-page">
      <ImageSlot {...images.servicesPage.individualTherapy} className="service-feature-image" priority />
      <section className="prose"><h1>{servicesPage.individualTherapy.heading}</h1><Paragraphs paragraphs={servicesPage.individualTherapy.paragraphs} /></section>
      <ImageSlot {...images.servicesPage.couplesTherapy} className="service-feature-image" />
      <section className="prose"><h2>{servicesPage.couplesTherapy.heading}</h2><Paragraphs paragraphs={servicesPage.couplesTherapy.paragraphs} /></section>
      <ImageSlot {...images.servicesPage.teenAndFamilyTherapy} className="service-feature-image" />
      <section className="prose"><h2>{servicesPage.teenAndFamilyTherapy.heading}</h2><Paragraphs paragraphs={servicesPage.teenAndFamilyTherapy.paragraphs} /></section>
      <ImageSlot {...images.servicesPage.therapyIntensive} className="service-feature-image" />
      <section className="prose development"><p className="eyebrow">{servicesPage.therapyIntensive.statusLabel}</p><h2>{servicesPage.therapyIntensive.heading}</h2><Paragraphs paragraphs={servicesPage.therapyIntensive.paragraphs} /></section>
      <section className="film-consultation"><div className="prose"><h2>{servicesPage.filmConsultation.heading}</h2><Paragraphs paragraphs={servicesPage.filmConsultation.paragraphs} /></div><ImageSlot {...images.servicesPage.filmConsultation} /></section>
      <MoreServices services={servicesPage.moreServices.items} expandLabel={servicesPage.moreServices.expandLabel} collapseLabel={servicesPage.moreServices.collapseLabel} />
    </main>
  );
}
