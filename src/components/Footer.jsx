import React from "react";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { PHONE, WHATSAPP } from "../data/site.js";

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
            <Phone size={15} /> 03215667784
          </a>
          <span>
            <MapPin size={15} /> 630 Block R, Model Town, Lahore
          </span>
          <a href={WHATSAPP} target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> WhatsApp our team
          </a>
        </div>
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
