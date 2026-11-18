import React from "react";
import { CheckCircle2, Facebook, Instagram, Linkedin } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import CountUp from "../components/CountUp.jsx";
import ceoPortrait from "../assets/images/about/ceo-m-ze-frank.webp";

// Replace the hrefs with the official Bunyaad Holdings profiles when ready.
const CEO_SOCIALS = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "Instagram", href: "#", Icon: Instagram },
];

export default function About() {
  return (
    <>
      <PageHero
        half
        variant="editorial"
        eyebrow="WHO WE ARE"
        title={
          <>
            A Foundation for
            <br />
            <em>What Comes Next.</em>
          </>
        }
        copy="A Lahore-based property sales, project marketing and real estate development company."
      />
      <section className="section-pad section-tint">
        <div className="container about-layout">
          <div>
            <span className="eyebrow">ABOUT BUNYAAD HOLDINGS</span>
            <h2>
              Property decisions deserve
              <br />
              <em>clarity and care.</em>
            </h2>
          </div>
          <div>
            <p>
              Bunyaad Holdings is a Lahore-based property sales, project
              marketing and real estate development company.
            </p>
            <p>
              We bring residential and commercial opportunities to buyers
              looking for a home, a business space or a property for their
              future plans. Our work includes marketing selected developer
              projects and undertaking our own developments.
            </p>
            <p>
              We believe property decisions deserve clear information and
              thoughtful consideration. We start by understanding your
              requirements, explaining the available options and helping you
              gather the details needed to move forward.
            </p>
            <p>
              Our initial portfolio includes Royal Atrium Mall, Bahria Sky 2,
              Curve and Sky Tree Tower.
            </p>
          </div>
        </div>
      </section>
      <section className="about-stats" aria-label="Bunyaad Holdings at a glance">
        <div className="container about-stats-grid">
          {[
            { value: "200+", label: "Residential Units Sold" },
            { value: "150+", label: "Commercial Outlets Sold" },
            { value: "10+", label: "Years Experience in the Market" },
            { value: "15+", label: "Alumni Investors Group Attached" },
          ].map((s) => (
            <div className="about-stat-card" key={s.label}>
              <b>
                <CountUp value={s.value} eager />
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>
      {[
        {
          eyebrow: "OUR MISSION",
          title: (
            <>
              The right property,
              <br />
              <em>clearly explained.</em>
            </>
          ),
          copy: "To connect people with suitable property opportunities in Lahore through clear communication, practical guidance and responsible development. Whether you are looking for a home, a business space or a long-term investment, we help you understand what is available and decide with confidence.",
          points: [
            "Understand your requirements before recommending any project.",
            "Explain residential and commercial options in plain terms.",
            "Support you from first enquiry through site visit and beyond.",
          ],
        },
        {
          eyebrow: "CO-FOUNDER / CEO MESSAGE",
          ceo: {
            heading: "Helping buyers decide smarter and move forward.",
            body: "We recognise that buyers and investors frequently lose both time and money while juggling active projects, client communications and daily decisions. That's why Bunyaad Holdings was developed — to tackle this challenge by offering precise project information, transparent payment plans, honest guidance and complete sale support, enabling buyers to move forward with greater confidence.",
            name: "M Ze Frank",
            role: "Co-Founder / CEO, Bunyaad Holdings",
          },
        },
        {
          eyebrow: "OUR CLARITY",
          title: (
            <>
              Decisions made
              <br />
              <em>with confidence.</em>
            </>
          ),
          copy: "Property decisions deserve clear information and thoughtful consideration. Clarity is how we work: we explain the details, answer the difficult questions and give you the space to make an informed decision — never a pressured one.",
          cards: [
            {
              title: "Transparent Details",
              text: "Project specifics, payment plans, unit sizes and delivery timelines — set out plainly before you commit.",
            },
            {
              title: "Straight Answers",
              text: "Honest information about location, approvals, construction progress and documentation.",
            },
            {
              title: "No-Pressure Guidance",
              text: "Time to compare options, revisit a site and ask questions until the decision is fully yours.",
            },
          ],
        },
      ].map((p, i) => (
        <section
          className={`section-pad about-pillar${
            i % 2 === 1 ? " section-tint" : " section-white"
          }${p.ceo ? " about-ceo-section" : ""}`}
          key={p.eyebrow}
        >
          {p.ceo ? (
            <div className="container about-ceo-grid">
              <div className="about-ceo-copy">
                <span className="eyebrow">{p.eyebrow}</span>
                <h2>{p.ceo.heading}</h2>
                <p>{p.ceo.body}</p>
                <div className="about-ceo-sig">
                  <span className="about-ceo-avatar">MZ</span>
                  <span>
                    <b>{p.ceo.name}</b>
                    <em>{p.ceo.role}</em>
                  </span>
                </div>
                <div className="about-ceo-social" aria-label="Bunyaad Holdings social profiles">
                  {CEO_SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      className="about-ceo-social-link"
                      aria-label={label}
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>
              <figure className="about-ceo-portrait">
                <img
                  src={ceoPortrait}
                  alt="M Ze Frank, Co-Founder / CEO of Bunyaad Holdings"
                  loading="lazy"
                />
              </figure>
            </div>
          ) : (
            <div className="container about-pillar-grid">
              <div className="about-pillar-head">
                <span className="eyebrow">{p.eyebrow}</span>
                <h2>{p.title}</h2>
              </div>
              <div className="about-pillar-body">
                <p>{p.copy}</p>
                {p.points && (
                  <ul className="about-pillar-list">
                    {p.points.map((t) => (
                      <li key={t}>
                        <CheckCircle2 size={18} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {p.cards && (
                  <div className="about-pillar-cards">
                    {p.cards.map((c) => (
                      <article className="about-pillar-card" key={c.title}>
                        <h3>{c.title}</h3>
                        <p>{c.text}</p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      ))}
      <ContactCTA />
    </>
  );
}
