import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";

export const metadata: Metadata = { title: "Fees" };

export default function FeesPage() {
  return (
    <main className="content-page wrap fees-page">
      <ImageSlot src="/images/fees-growth.jpg" alt="A young plant being held in caring hands" label="Fees growth image" className="fees-image" />
      <div className="fees-intro prose"><p>Therapy is an investment in the most important relationship you will ever have — the relationship with yourself. It is not simply a place to reduce symptoms or solve problems, but a deeply personal and creative process of discovering who you are beneath expectations, old wounds, defenses, and the roles you have learned to play. Through greater awareness of your inner world, you can begin to recognize what truly belongs to you: your desires, values, strengths, conflicts, and capacity for meaning.</p><p>Therapy creates the space to understand your past without remaining bound by it, to make more conscious choices in the present, and to become the author of your own life. Ultimately, the work is about becoming more fully yourself and having the freedom and courage to live authentically, true to who you are.</p></div>
      <div className="fee-card"><strong>Individual Therapy</strong><span>$250 / 50-minute session</span></div>
      <div className="fee-card"><strong>Couples and Family Therapy</strong><span>$300 / 60-minute session</span></div>
      <section className="fees-details"><h1>Out-of-Network Benefits</h1><p>We are an out-of-network practice and do not take insurance.</p><p>However, we can provide a superbill for clients to submit to their insurance company for reimbursement.</p><h2>Payment</h2><p>Payment is due at the time of each session. We accept credit/debit card, cash, and Zelle.</p></section>
      <Link className="primary-cta" href="/contact">Schedule a Consultation</Link>
    </main>
  );
}
