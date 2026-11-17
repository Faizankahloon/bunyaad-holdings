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
        "Who We Are",
        "Bunyaad Holdings is the data controller for personal information collected through this website and during the provision of our property services. Contact information: Bunyaad Holdings, 630 Block R, Model Town, Lahore. Email: info@bunyaadholdings.com. Phone / WhatsApp: 03215667784.",
      ],
      [
        "What Data We Collect",
        "We may collect the following information: name, email address, phone number, company name, project details and enquiry information, communication records, and website usage information and cookies.",
      ],
      [
        "How We Use Your Data",
        "We use your information to respond to enquiries, provide property sales, project marketing and development services, schedule meetings and site visits, send project and service updates, send promotional offers or discounts related to our services, improve our website and customer experience, and comply with legal obligations.",
      ],
      [
        "SMS & WhatsApp Communications",
        "By providing your phone number through our website forms or other communication channels, you consent to receive messages from Bunyaad Holdings. Messages may include property service offers, appointment and site-visit reminders, project updates, customer support notifications, and promotions or discount offers. Message frequency may vary. Message and data rates may apply. You may opt out at any time by replying STOP to any message; reply HELP for assistance.",
      ],
      [
        "Mobile Information Sharing",
        "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
      ],
      [
        "Legal Basis for Processing",
        "We process personal data based on: contractual necessity, legitimate business interests, and consent where required by law.",
      ],
      [
        "Data Retention",
        "We retain client records for up to 7 years for accounting and legal purposes. General enquiry information may be retained for up to 2 years unless a business relationship is established.",
      ],
      [
        "Your Rights",
        "Depending on applicable law, you may have the right to: access your personal data, correct inaccurate information, request deletion of your data, restrict or object to processing, and request transfer of your data. To exercise these rights, contact us at info@bunyaadholdings.com.",
      ],
      [
        "Third-Party Services",
        "We do not sell personal information. We may share information with trusted service providers that help us operate our business, such as email providers, CRM systems, accounting software, or cloud hosting providers. These providers are contractually obligated to protect your information.",
      ],
      [
        "Cookies",
        "Our website may use cookies and analytics technologies to improve user experience and website functionality.",
      ],
      [
        "Changes to This Policy",
        "We may update this Privacy Policy periodically. The latest version will always be available on this page.",
      ],
      [
        "Contact for Privacy Requests",
        "Privacy questions or requests should be directed to info@bunyaadholdings.com or by phone / WhatsApp at 03215667784.",
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
        "About Us",
        "Bunyaad Holdings is a property company based in Lahore, Pakistan. Registered Office: 630 Block R, Model Town, Lahore. References to “we,” “us,” or “our” refer to Bunyaad Holdings.",
      ],
      [
        "Services",
        "We provide property services including: property sales and advisory, project marketing and sales for our partner developers, and our own development activities. Service details are outlined in the applicable proposal or agreement provided to clients.",
      ],
      [
        "Engagement",
        "Services begin once the client accepts a proposal, quotation, or agreement in writing and any required deposit has been received.",
      ],
      [
        "Fees & Payment",
        "Project-based services may require an upfront deposit or booking amount before work begins. Invoices are payable within 14 days unless otherwise agreed in writing. We reserve the right to suspend services for overdue accounts.",
      ],
      [
        "Cancellation of Services",
        "Ongoing services may be cancelled by either party with 30 days written notice sent to info@bunyaadholdings.com.",
      ],
      [
        "Intellectual Property",
        "All deliverables remain the property of Bunyaad Holdings until full payment has been received. Project renders, floor plans and marketing material shown on this website remain the property of their respective developers and are used for representation purposes.",
      ],
      [
        "Represented Projects",
        "Royal Atrium Mall, Bahria Sky 2, Curve and Sky Tree Tower are projects by their respective developers, marketed by Bunyaad Holdings under agreement. They are not developments owned or built by Bunyaad Holdings.",
      ],
      [
        "Confidentiality",
        "Both parties agree to maintain confidentiality of any proprietary or commercially sensitive information shared during the engagement.",
      ],
      [
        "Limitation of Liability",
        "To the maximum extent permitted by law, Bunyaad Holdings shall not be liable for indirect, incidental, or consequential damages arising from the use of our services or reliance on the information presented on this website. Our maximum liability shall not exceed the amount paid for the specific service giving rise to the claim.",
      ],
      [
        "SMS & WhatsApp Terms of Service",
        "By submitting your phone number through our website or other communication methods, you consent to receive messages from Bunyaad Holdings. Messages may include: property service offers, appointment and site-visit reminders, meeting scheduling, project updates, customer support notifications, and promotional offers and discounts. Message frequency may vary. Message and data rates may apply. You can opt out at any time by replying STOP to any message; reply HELP for additional assistance. Consent to receive messages is not a condition of purchase.",
      ],
      [
        "Mobile Information Sharing",
        "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
      ],
      [
        "Governing Law",
        "These Terms & Conditions shall be governed by the laws of Pakistan, and any disputes shall be subject to the exclusive jurisdiction of the courts of Lahore, Pakistan.",
      ],
      [
        "Changes to These Terms",
        "We may update these Terms & Conditions periodically. The latest version will always be published on this website.",
      ],
      [
        "Contact Details",
        "Questions about these Terms? Contact us at info@bunyaadholdings.com or by phone / WhatsApp at 03215667784, or visit our office at 630 Block R, Model Town, Lahore.",
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
        </div>
      </section>
    </>
  );
}
