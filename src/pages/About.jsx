import React from "react";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import ContactCTA from "../components/ContactCTA.jsx";

export default function About() {
  return (
    <>
      <PageHero
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
      <section className="section-pad section-white">
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
      <section className="section-pad section-tint">
        <div className="container values-grid">
          {[
            [
              "01",
              "Our Mission",
              "To connect people with suitable property opportunities through clear communication, practical guidance and responsible development.",
            ],
            [
              "02",
              "Our Vision",
              "To grow Bunyaad Holdings into a recognised property and development brand built on lasting customer relationships and thoughtfully delivered projects.",
            ],
            [
              "03",
              "Our Values",
              "Clarity. Accountability. Customer Care. Long-Term Thinking.",
            ],
          ].map(([n, t, c]) => (
            <article className="value-card" key={t}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
        <div className="container center-link">
          <a className="btn btn-navy" href="#/projects">
            Explore Our Projects <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
