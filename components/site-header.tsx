"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { ImageSlot } from "@/components/image-slot";
import { siteContent } from "@/content/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { contactInformation, header, images, navigation, sharedLabels } = siteContent;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="site-header">
      <div className="header-top wrap">
        <Link className="brand" href="/" aria-label={header.homeAriaLabel}>
          <ImageSlot {...images.branding.headerLogo} className="brand-logo-slot" priority />
        </Link>
        <div className="header-contact">
          <a className="phone" href={contactInformation.phone.href}><Phone className="phone-icon" aria-hidden="true" /><span>{contactInformation.phone.display}</span></a>
          <Link className="header-cta" href="/contact"><span className="button-label">{sharedLabels.scheduleConsultation}</span></Link>
        </div>
      </div>
      <nav className="desktop-nav wrap" aria-label={navigation.desktopAriaLabel}>
        {navigation.links.map(({ label, href }) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}><span className="button-label">{label}</span></Link>)}
      </nav>
      <div className="mobile-nav wrap">
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-links"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >{navigation.mobileMenuLabel}</button>
        <div className="mobile-nav-panel" data-open={mobileMenuOpen}>
          <div className="mobile-nav-panel-inner">
            <nav id="mobile-nav-links" aria-label={navigation.mobileAriaLabel} inert={!mobileMenuOpen}>
              {navigation.links.map(({ label, href }) => <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}><span className="button-label">{label}</span></Link>)}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
