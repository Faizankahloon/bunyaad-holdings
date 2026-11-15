import React from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { PHONE, WHATSAPP } from "../data/site.js";
import PageHero from "../components/PageHero.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function Contact({ project = "" }) {
  return (
    <>
      <PageHero
        variant="compact"
        eyebrow="START A CONVERSATION"
        title={
          <>
            Let’s Talk About
            <br />
            <em>Your Next Property.</em>
          </>
        }
        copy="Looking for a home, commercial space or information about a specific project? Contact Bunyaad Holdings and tell us what you have in mind."
      />
      <section className="section-pad section-white">
        <div className="container contact-layout">
          <div className="contact-aside">
            <span className="eyebrow">CONTACT DETAILS</span>
            <h2>
              We’re here to
              <br />
              <em>help you explore.</em>
            </h2>
            <a href={`tel:${PHONE}`}>
              <Phone />{" "}
              <span>
                <small>CALL OUR TEAM</small>
                <b>0321 5667784</b>
              </span>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              <MessageCircle />
              <span>
                <small>WHATSAPP</small>
                <b>Chat with our team</b>
              </span>
            </a>
            <div className="contact-address">
              <MapPin />
              <span>
                <small>VISIT OUR OFFICE</small>
                <b>630 Block R, Model Town, Lahore</b>
              </span>
            </div>
          </div>
          <div>
            <span className="eyebrow">SEND AN ENQUIRY</span>
            <h2>
              Tell us what
              <br />
              <em>you’re looking for.</em>
            </h2>
            <ContactForm project={project} />
          </div>
        </div>
      </section>
    </>
  );
}
