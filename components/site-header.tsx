"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageSlot } from "@/components/image-slot";

const links = [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Fees", "/fees"], ["Blog", "/blog"], ["Contact", "/contact"]] as const;

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-top wrap">
        <Link className="brand" href="/" aria-label="Depth and Meaning Psychotherapy home">
          <ImageSlot src="/images/header-logo.png" alt="Depth and Meaning Psychotherapy" label="Header logo" className="brand-logo-slot" />
        </Link>
        <div className="header-contact">
          <a className="phone" href="tel:+17473053949">☎ <span>(747) 305-3949</span></a>
          <Link className="header-cta" href="/contact">Schedule a Consultation</Link>
        </div>
      </div>
      <nav className="desktop-nav wrap" aria-label="Main navigation">
        {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
      </nav>
      <details className="mobile-nav wrap"><summary>Menu</summary><nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></details>
    </header>
  );
}
