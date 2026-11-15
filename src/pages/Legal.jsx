import React from "react";
import PageHero from "../components/PageHero.jsx";
import { PHONE, WHATSAPP } from "../data/site.js";

// Privacy Notice & Website Terms — plain, factual pages for the required
// footer links. Update as company policies are confirmed.
const PAGES = {
  privacy: {
    eyebrow: "PRIVACY NOTICE",
    title: (
      <>
        Your privacy,
        <br />
        <em>handled clearly.</em>
      </>
    ),
    sections: [
      [
        "What we collect",
        "When you contact Bunyaad Holdings through this website — by enquiry form, phone or WhatsApp — we receive the details you choose to share, such as your name, phone number, email address, property requirement, budget and message.",
      ],
      [
        "How we use it",
        "We use your details for one purpose: to respond to your enquiry and contact you about it using the details you have provided. We do not sell your details or share them with third parties for their own marketing.",
      ],
      [
        "Project information",
        "Enquiries about specific projects may be shared with the relevant developer team so our team can respond accurately about availability and site visits.",
      ],
      [
        "Your choice",
        "You decide what to share. Only the marked fields are required to respond to your enquiry. If you would like your details updated or removed, contact us using the details below.",
      ],
      [
        "Contact",
        "Bunyaad Holdings · 630 Block R, Model Town, Lahore. Phone / WhatsApp: 03215667784.",
      ],
    ],
  },
  terms: {
    eyebrow: "WEBSITE TERMS",
    title: (
      <>
        Terms for using
        <br />
        <em>this website.</em>
      </>
    ),
    sections: [
      [
        "Information only",
        "This website presents information about property opportunities in Lahore for general guidance. It does not constitute an offer, contract or advice.",
      ],
      [
        "Accuracy",
        "Project information, availability and purchase terms are subject to confirmation. Renderings illustrate proposed designs. Please review the relevant project documents before booking.",
      ],
      [
        "Represented projects",
        "Royal Atrium Mall, Bahria Sky 2, Curve and Sky Tree Tower are projects by their respective developers, marketed by Bunyaad Holdings under agreement. They are not developments owned or built by Bunyaad Holdings.",
      ],
      [
        "Contact details",
        "Telephone and WhatsApp numbers and the enquiry form on this website are for property enquiries with Bunyaad Holdings.",
      ],
      [
        "Get in touch",
        "Questions about these terms? Call or WhatsApp 03215667784, or visit our office at 630 Block R, Model Town, Lahore.",
      ],
    ],
  },
};

export default function Legal({ page }) {
  const data = PAGES[page] || PAGES.privacy;
  return (
    <>
      <PageHero eyebrow={data.eyebrow} title={data.title} />
      <section className="section-pad section-white">
        <div className="container legal-page">
          {data.sections.map(([heading, text]) => (
            <div className="legal-block" key={heading}>
              <h2>{heading}</h2>
              <p>{text}</p>
            </div>
          ))}
          <p className="legal-note" style={{ maxWidth: "100%" }}>
            Questions? Call{" "}
            <a href={`tel:${PHONE}`}>03215667784</a> or message us on{" "}
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
