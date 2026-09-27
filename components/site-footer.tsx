import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";
import { siteContent } from "@/content/site-content";

export function SiteFooter() {
  const { contactInformation, footer, images, siteIdentity } = siteContent;

  return (
    <footer className="site-footer">
      <div className="footer-grid wrap">
        <ImageSlot {...images.branding.footerLogo} className="footer-logo-slot" />
        <section><h2>{footer.contactHeading}</h2><a href={contactInformation.phone.href}>{contactInformation.phone.display}</a><a href={contactInformation.email.href}>{contactInformation.email.display}</a></section>
        <section><h2>{footer.hoursHeading}</h2><p>{contactInformation.officeHours.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p></section>
        <section><h2>{footer.locationHeading}</h2><p>{contactInformation.address.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p></section>
      </div>
      <div className="footer-bottom wrap"><span>{siteIdentity.copyrightText}</span><span><Link href="/terms#terms">{footer.termsLabel}</Link> {footer.legalLinkSeparator} <Link href="/terms#privacy">{footer.privacyLabel}</Link></span></div>
    </footer>
  );
}
