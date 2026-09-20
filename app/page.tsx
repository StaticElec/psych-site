import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";

const services = [
  { title: "Anxiety", image: "/images/home-anxiety.jpg", copy: "Anxiety can shape how we think, feel, and experience everyday life. Persistent worry, racing thoughts, tension, and uncertainty can leave us feeling overwhelmed and disconnected from the present. Therapy offers a space to understand the deeper roots of anxiety, recognize patterns that sustain it, and develop greater self-awareness, clarity, and confidence." },
  { title: "Depression", image: "/images/home-depression.jpg", copy: "Depression can affect how we see ourselves, our relationships, and our connection to life. Sadness, emptiness, exhaustion, or hopelessness can make even familiar things feel difficult. Therapy offers a supportive space to understand what lies beneath these experiences, explore patterns that keep you stuck, and reconnect with yourself, others, and what gives your life meaning." },
  { title: "Family therapy", image: "/images/home-family.jpg", copy: "Family relationships can be deeply meaningful, yet patterns of conflict, misunderstanding, and disconnection can be difficult to change. Therapy offers a supportive space to understand these dynamics, address unresolved concerns, and develop healthier ways of communicating and relating—creating greater understanding, connection, and balance within the family." },
];

export default function Home() {
  return (
    <main>
      <section className="hero wrap" aria-label="Introduction">
        <ImageSlot src="/images/home-hero.jpg" alt="Coastal landscape at sunset" label="Home hero image" priority />
        <h1>Discover Your Depth<br />Find Your Meaning</h1>
      </section>
      <section className="home-intro wrap">
        <blockquote><span aria-hidden="true">“</span>My hope is that therapy becomes more than a place to reduce suffering. It can become a place where people reconnect with themselves, discover new meaning in their lives, and move toward living with greater authenticity, freedom, and purpose.</blockquote>
        <Link className="primary-cta" href="/contact">Schedule a Consultation</Link>
      </section>
      <section className="services-preview wrap" aria-labelledby="therapy-services">
        <h2 id="therapy-services">Therapy Services</h2>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-row" key={service.title}>
              <ImageSlot src={service.image} alt="" label={`${service.title} image`} />
              <div><h3 className="sr-only">{service.title}</h3><p>{service.copy}</p></div>
            </article>
          ))}
        </div>
        <div className="services-actions">
          <Link className="explore-link" href="/services">Explore all <span aria-hidden="true">→</span></Link>
          <Link className="primary-cta" href="/contact">Schedule a Consultation</Link>
        </div>
      </section>
    </main>
  );
}
