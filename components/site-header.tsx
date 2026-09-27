"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageSlot } from "@/components/image-slot";
import { siteContent } from "@/content/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const { contactInformation, header, images, navigation, sharedLabels } = siteContent;

  return (
    <header className="site-header">
      <div className="header-top wrap">
        <Link className="brand" href="/" aria-label={header.homeAriaLabel}>
          <ImageSlot {...images.branding.headerLogo} className="brand-logo-slot" priority />
        </Link>
        <div className="header-contact">
          <a className="phone" href={contactInformation.phone.href}>{header.phoneIcon} <span>{contactInformation.phone.display}</span></a>
          <Link className="header-cta" href="/contact"><span className="button-label">{sharedLabels.scheduleConsultation}</span></Link>
        </div>
      </div>
      <nav className="desktop-nav wrap" aria-label={navigation.desktopAriaLabel}>
        {navigation.links.map(({ label, href }) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}><span className="button-label">{label}</span></Link>)}
      </nav>
      <details className="mobile-nav wrap"><summary>{navigation.mobileMenuLabel}</summary><nav aria-label={navigation.mobileAriaLabel}>{navigation.links.map(({ label, href }) => <Link key={href} href={href}><span className="button-label">{label}</span></Link>)}</nav></details>
    </header>
  );
}
