import type { Metadata } from "next";
import { ImageSlot } from "@/components/image-slot";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="content-page wrap about-page">
      <div className="about-lead">
        <div className="prose">
          <p>Dr. Romanov is a psychotherapist practicing in the Los Angeles area whose work is grounded in psychoanalytic and existential psychotherapy. She believes that lasting psychological change begins with a deep understanding of the unconscious forces, life experiences, and relationships that shape who we become. Her therapeutic approach emphasizes not only symptom relief but also uncovering your true Self, personal transformation, resilience, and the search for meaning.</p>
          <p>Dr. Romanov has extensive clinical experience treating individuals struggling with complex trauma, PTSD, depression, anxiety disorders, schizophrenia spectrum disorders, eating disorders, and difficulties related to identity, relationships, and life transitions. She works with adults and teenagers from diverse cultural backgrounds and is particularly attuned to the emotional impact of trauma, loss, migration, and major life changes.</p>
        </div>
        <figure><ImageSlot src="/images/dr-yana-romanov.jpg" alt="Dr. Yana Romanov" label="Portrait: dr-yana-romanov.jpg" /><figcaption>Dr. Yana Romanov, LMFT, PsyD</figcaption></figure>
      </div>
      <div className="prose full-prose">
        <p>In addition to her clinical work, Dr. Romanov conducted doctoral research in immigration studies, exploring the profound psychological transformation that accompanies migration, cultural adaptation, identity reconstruction, and belonging. Having lived in several countries and speaking multiple languages, she brings both professional expertise and personal understanding to the unique challenges faced by immigrants, expatriates, multilingual individuals, and those navigating life between cultures.</p>
        <p>Dr. Romanov earned her doctoral degree from The Chicago School of Professional Psychology, graduating with Delta Kappa Alpha Lambda honors. She completed advanced psychoanalytic training at the Valley Community Counseling Clinic, where she trained under the supervision of Dr. Callae Walcott-Rounds, Dr. Shari Saperstein, and Dr. Diane Fletcher-Hoppe. Her training emphasized depth-oriented psychotherapy, object relations theory, attachment, trauma-informed treatment, and long-term psychodynamic work.</p>
        <p>Her clinical philosophy is rooted in the belief that emotional suffering is meaningful. Symptoms often represent attempts to cope with unresolved conflicts, trauma, or losses, and psychotherapy offers an opportunity to understand these deeper patterns rather than simply suppress them. Dr. Romanov strives to create a warm, thoughtful, and nonjudgmental therapeutic relationship in which clients feel genuinely understood and supported while developing greater self-awareness, emotional freedom, and a more authentic way of living.</p>
        <p>Whether working with trauma, relationship difficulties, depression, anxiety, or questions of identity and purpose, Dr. Romanov&apos;s goal is to help clients discover a deeper understanding of themselves, heal authentically, and build lives that feel more meaningful, connected, and fully their own.</p>
      </div>
    </main>
  );
}
