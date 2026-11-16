import React from "react";
import { ArrowUpRight, Building2 } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import ContactCTA from "../components/ContactCTA.jsx";

// Our Developments — kept separate from the four represented projects.
// No placeholder development cards; project details will be added as
// they become available.
export default function Developments() {
  return (
    <>
      <PageHero
        eyebrow="OUR OWN DEVELOPMENTS"
        title={
          <>
            Building from the
            <br />
            <em>Foundation Up.</em>
          </>
        }
        copy="Development is part of the Bunyaad Holdings story. Alongside property sales and project marketing, we undertake our own development projects."
      />

      <section className="section-pad section-white">
        <div className="container about-layout">
          <div>
            <span className="eyebrow">BUNYAAD DEVELOPMENTS</span>
            <h2>
              Our own development
              <br />
              <em>work.</em>
            </h2>
            <Building2 className="key-details-icon" size={34} />
          </div>
          <div>
            <p>
              Development is part of the Bunyaad Holdings story. Alongside
              property sales and project marketing, we undertake our own
              development projects.
            </p>
            <p>
              Contact our team to learn about our development activities.
              Individual project details and updates will be added as they
              become available.
            </p>
            <a className="btn btn-gold" href="#/contact">
              Enquire About Our Developments <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
