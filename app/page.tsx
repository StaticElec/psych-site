import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";
import { siteContent } from "@/content/site-content";

export default function Home() {
  const { homePage, images, sharedLabels } = siteContent;

  return (
    <main>
      <section className="hero wrap" aria-label={homePage.introductionAriaLabel}>
        <ImageSlot {...images.homePage.hero} priority />
        <h1>{homePage.headlineLines[0]}<br />{homePage.headlineLines[1]}</h1>
      </section>
      <section className="home-intro wrap">
        <blockquote><span aria-hidden="true">{homePage.openingQuotationMark}</span>{homePage.quotation}</blockquote>
        <Link className="primary-cta" href="/contact"><span className="button-label">{sharedLabels.scheduleConsultation}</span></Link>
      </section>
      <section className="services-preview wrap" aria-labelledby="therapy-services">
        <h2 id="therapy-services">{homePage.servicesHeading}</h2>
        <div className="service-list">
          {homePage.services.map((service) => {
            const image = images.homePage[service.imageKey];
            return (
              <article className="service-row" key={service.title}>
                <ImageSlot {...image} />
                <div><h3 className="sr-only">{service.title}</h3><p>{service.description}</p></div>
              </article>
            );
          })}
        </div>
        <div className="services-actions">
          <Link className="explore-link" href="/services"><span className="button-label">{homePage.exploreAllLabel} <span aria-hidden="true">{homePage.exploreAllArrow}</span></span></Link>
          <Link className="primary-cta" href="/contact"><span className="button-label">{sharedLabels.scheduleConsultation}</span></Link>
        </div>
      </section>
    </main>
  );
}
