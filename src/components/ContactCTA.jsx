import React from "react";
import { ArrowUpRight, Phone, MessageCircle, Clock, MapPin, ShieldCheck } from "lucide-react";
import { PHONE, WHATSAPP } from "../data/site.js";

// High-impact call-to-action band that navigates visitors to the contact page.
export default function ContactCTA({
  eyebrow = "LET’S TAKE THE NEXT STEP",
  title = (
    <>
      Tell Us What You’re
      <br />
      <em>Looking For.</em>
    </>
  ),
  copy = "Share your preferred location, property type and budget on the contact page — our team will help you explore suitable options.",
  trust = ["Response within 24 hours", "Guidance from a real team", "No obligation enquiry"],
  primaryLabel = "Go to Contact Page",
  primaryHref = "#/contact",
  phoneLabel = "0321 5667784",
  hidePhone = false,
}) {
  return (
    <section className="contact-cta">
      <span className="cta-watermark" aria-hidden="true">
        BUNYAAD
      </span>
      <span className="cta-ring cta-ring-1" aria-hidden="true" />
      <span className="cta-ring cta-ring-2" aria-hidden="true" />
      <span className="cta-glow" aria-hidden="true" />

      <div className="container cta-inner">
        <div className="cta-head">
          <span className="cta-eyebrow">
            <span className="cta-eyebrow-line" />
            {eyebrow}
            <span className="cta-eyebrow-line" />
          </span>
          <h2 className="cta-title">{title}</h2>
          <p className="cta-copy">{copy}</p>

          <div className="cta-actions">
            <a className="cta-btn cta-btn-primary" href={primaryHref}>
              <span className="cta-btn-face">{primaryLabel}</span>
              <span className="cta-btn-icon">
                <ArrowUpRight size={19} />
              </span>
            </a>
            {!hidePhone && (
              <a className="cta-btn cta-btn-ghost" href={`tel:${PHONE}`}>
                <Phone size={16} />
                <span>{phoneLabel}</span>
              </a>
            )}
            <a
              className="cta-btn cta-btn-ghost"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <ul className="cta-trust">
            {trust.map((t, i) => (
              <li key={t}>
                {[<Clock key="c" size={13} />, <ShieldCheck key="s" size={13} />, <MapPin key="m" size={13} />][i % 3]}
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
