// Central site data: contact details, projects and per-project detail copy.

// Real project visuals (downloaded from the developer websites)
import royalAtriumMall from "../assets/images/royal-atrium-mall/fashion-floors-featured.jpg";
import bahriaSky2 from "../assets/images/bahria-sky-2/landing.webp";
import curve from "../assets/images/curve/hero.webp";
import skyTreeTower from "../assets/images/sky-tree-tower/hero.webp";

export const PHONE = "+923215667784";
export const PHONE_DISPLAY = "03215667784";
export const EMAIL = "info@bunyaadholdings.com";
export const WHATSAPP = "https://wa.me/923215667784";

// ── Enquiry destination ────────────────────────────────────────────────
// To be confirmed with the team during setup before launch.
// Set ENQUIRY_ENDPOINT to a working form endpoint (e.g. Formspree / CRM
// webhook) and enquiries will be delivered there. Until then, submissions
// fall back to WhatsApp with a prefilled enquiry summary so delivery works.
export const ENQUIRY_ENDPOINT = "";

// Canonical site URL — confirm the live domain before launch (used for
// sitemap, canonical tags and social sharing previews).
export const SITE_URL = "https://www.bunyaadholdings.com";

// WhatsApp deep link with a prefilled message (used for site-visit
// requests and the enquiry fallback so the project is auto-identified).
export function whatsappMessage(text) {
  return `${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export const projects = [
  {
    slug: "royal-atrium-mall",
    name: "Royal Atrium Mall",
    developer: "Royal Developers",
    type: "Residential + Retail",
    location: "Al-Kabir Downtown, Lahore",
    description:
      "Explore residential and retail opportunities in Al-Kabir Downtown, Lahore.",
    headline: "A destination for living and retail.",
    image: royalAtriumMall,
  },
  {
    slug: "bahria-sky-2",
    name: "Bahria Sky 2",
    developer: "OZ Developers",
    type: "Apartments + Retail",
    location: "Bahria Orchard, Lahore",
    description:
      "Discover apartments, penthouses and shops in Bahria Orchard, Lahore.",
    headline: "Living and business in one destination.",
    image: bahriaSky2,
  },
  {
    slug: "curve",
    name: "Curve",
    developer: "HF Developers",
    type: "Commercial",
    location: "Main Pine Avenue, Lahore",
    description: "Explore commercial spaces on Main Pine Avenue, Lahore.",
    headline: "A new setting for your business.",
    image: curve,
  },
  {
    slug: "sky-tree-tower",
    name: "Sky Tree Tower",
    developer: "HF Developers",
    type: "Commercial",
    location: "Eden Abad, Main Pine Avenue, Lahore",
    description:
      "Discover retail, office and showroom spaces on Main Pine Avenue.",
    headline: "Space for your next business move.",
    image: skyTreeTower,
  },
];

export const detail = {
  "royal-atrium-mall": {
    headline: "Explore Royal Atrium Mall with Bunyaad Holdings.",
    intro:
      "Royal Atrium Mall is a mixed-use project by Royal Developers on Main Raiwind Road, Al-Kabir Downtown, Lahore. Bringing retail and residences together, it offers options for buyers exploring residential and commercial property.",
    location: "Main Raiwind Road, Al-Kabir Downtown, Lahore",
    focus: "Residential apartments and commercial retail",
    role: "Project Sales & Marketing",
  },
  "bahria-sky-2": {
    headline: "Living and Business in One Destination.",
    intro:
      "Bahria Sky 2 is a mixed-use project by OZ Developers in Bahria Orchard, Lahore. The project brings together apartments, penthouses and shops within one development.",
    location: "Bahria Orchard, Lahore",
    focus: "Apartments, penthouses and shops",
    role: "Project Sales & Marketing",
  },
  curve: {
    headline: "A New Setting for Your Business.",
    intro:
      "Curve is a commercial project by HF Developers on Main Pine Avenue, near Lake City–Ring Road Interchange, Lahore. The project includes retail, showroom, office and dining spaces.",
    location: "Main Pine Avenue, near Lake City–Ring Road Interchange, Lahore",
    focus: "Shops, showrooms, offices and dining spaces",
    role: "Project Sales & Marketing",
  },
  "sky-tree-tower": {
    headline: "Space for Your Next Business Move.",
    intro:
      "Sky Tree Tower is a commercial project by HF Developers at 19 Main Pine Avenue, Eden Abad, near Ring Road Interchange. The project features retail units, offices and showrooms.",
    location: "19 Main Pine Avenue, Eden Abad, near Ring Road Interchange",
    focus: "Retail units, offices and showrooms",
    role: "Project Sales & Marketing",
  },
};
