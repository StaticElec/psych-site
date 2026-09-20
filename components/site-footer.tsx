import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid wrap">
        <ImageSlot src="/images/footer-logo.png" alt="Depth and Meaning Psychotherapy" label="Footer logo" className="footer-logo-slot" />
        <section><h2>Contact</h2><a href="tel:+17473053949">(747) 305-3949</a><a href="mailto:yanaromanov@depthandmeaning.com">yanaromanov@depthandmeaning.com</a></section>
        <section><h2>Hours</h2><p>Monday – Friday<br />11:00 – 6:00</p></section>
        <section><h2>Location</h2><p>15455 San Fernando Mission Blvd<br />Suite 300<br />Mission Hills, CA 91345</p></section>
      </div>
      <div className="footer-bottom wrap"><span>© Depth and Meaning 2026</span><span><Link href="/terms#terms">Terms and Conditions</Link> · <Link href="/terms#privacy">Privacy Policy</Link></span></div>
    </footer>
  );
}
