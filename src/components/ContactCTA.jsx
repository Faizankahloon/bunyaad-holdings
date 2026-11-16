import React from "react";
import { ArrowUpRight, MessageCircle, Clock, MapPin, ShieldCheck } from "lucide-react";
import { PHONE, WHATSAPP } from "../data/site.js";

// High-impact call-to-action band, shared by every page so the CTA is
// identical site-wide (per marketing-website design).
export default function ContactCTA() {
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
            LET’S TAKE THE NEXT STEP
            <span className="cta-eyebrow-line" />
          </span>
          <h2 className="cta-title">
            Let’s Find the Right
            <br />
            <em>Property for You.</em>
          </h2>
          <p className="cta-copy">
            Tell us your preferred location, property type and budget. Our team
            will help you explore suitable options.
          </p>

          <div className="cta-actions cta-actions-pair">
            <a className="cta-btn cta-btn-primary" href={`tel:${PHONE}`}>
              <span className="cta-btn-face">Call Now</span>
              <span className="cta-btn-icon">
                <ArrowUpRight size={19} />
              </span>
            </a>
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
            {[
              "Response within 24 hours",
              "Guidance from a real team",
              "No obligation enquiry",
            ].map((t, i) => (
              <li key={t}>
                {
                  [<Clock key="c" size={13} />, <ShieldCheck key="s" size={13} />, <MapPin key="m" size={13} />][
                    i % 3
                  ]
                }
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
