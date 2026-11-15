import React from "react";
import { Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { PHONE, WHATSAPP } from "../data/site.js";

// Sticky contact bar on mobile: working call, WhatsApp and enquiry buttons.
export default function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Quick contact">
      <a href={`tel:${PHONE}`} aria-label="Call Bunyaad Holdings">
        <Phone size={18} />
        <span>Call Now</span>
      </a>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Bunyaad Holdings"
        className="bar-whatsapp"
      >
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>
      <a href="#/contact" className="bar-enquire">
        <ArrowUpRight size={17} />
        <span>Enquire Now</span>
      </a>
    </nav>
  );
}
