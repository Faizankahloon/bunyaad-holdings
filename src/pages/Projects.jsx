import React from "react";
import PageHero from "../components/PageHero.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import { projects } from "../data/site.js";

export default function Projects() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="OUR PORTFOLIO"
        title={
          <>
            Explore Projects
            <br />
            <em>with Bunyaad Holdings.</em>
          </>
        }
        copy="Browse our featured residential and commercial projects. Learn about each location and property offering, then contact our team to discuss your requirements."
      />
      <section className="section-pad section-tint">
        <div className="container project-grid">
          {projects.map((p, i) => (
            <ProjectCard p={p} i={i} key={p.slug} />
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
