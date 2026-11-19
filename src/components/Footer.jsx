import React from "react";
import {
  Phone,
  MapPin,
  MessageCircle,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { PHONE, PHONE_DISPLAY, EMAIL, WHATSAPP } from "../data/site.js";

// Replace the hrefs with the official Bunyaad Holdings profiles when ready.
const SOCIALS = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "Instagram", href: "#", Icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a className="brand brand-light" href="#/">
            <span className="brand-mark">B</span>
            <span>
              <b>BUNYAAD</b>
              <small>HOLDINGS</small>
            </span>
          </a>

          <h4 className="company-description-heading">Company Description</h4>

          <p className="footer-copy">
            Bunyaad Holdings connects buyers with residential and commercial
            property opportunities through property sales, project marketing and
            our own development activities.
          </p>
        </div>

        <div>
          <h4>Links</h4>
          <a href="#/">Home</a>
          <a href="#/about">About Us</a>
          <a href="#/projects">Projects</a>
          <a href="#/developments">Our Developments</a>
          <a href="#/contact">Contact Us</a>
        </div>

        <div>
          <h4>Contact</h4>
          <a href={`tel:${PHONE}`}>
            <Phone size={15} /> {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`}>
            <Mail size={15} /> {EMAIL}
          </a>
          <span>
            <MapPin size={15} /> 630 Block R, Model Town, Lahore
          </span>
          <a href={WHATSAPP} target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> WhatsApp our team
          </a>
        </div>
      </div>

      <div className="container footer-social">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            className="footer-social-link"
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Bunyaad Holdings. All rights reserved.
        </span>

        <nav className="footer-legal-links" aria-label="Legal links">
          <a href="#/privacy-notice">Privacy Notice</a>
          <a href="#/website-terms">Website Terms</a>
        </nav>
      </div>
    </footer>
  );
}
