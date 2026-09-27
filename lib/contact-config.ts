// Set NEXT_PUBLIC_CONTACT_API_URL when the contact Worker uses a separate origin.
// A same-domain Cloudflare route can use the default path.
export const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || "/api/contact";
