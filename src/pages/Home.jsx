import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
  Phone,
  Home as House,
  Building2,
  Handshake,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { WHATSAPP, projects } from "../data/site.js";
import SectionHead from "../components/SectionHead.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import whyImage from "../assets/images/why-section.jpg";

export default function Home() {
  const [slide, setSlide] = useState(0);
  const p = projects[slide];
  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % projects.length),
      5500,
    );
    return () => clearInterval(t);
  }, []);
  // Scroll-triggered reveal (additive; respects reduced motion via CSS)
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(
      ".intro .intro-grid > *, .projects-section .section-head, .project-card, .services .section-head, .service-item, .why-image, .why-copy > *, .cta-inner > *, .center-link",
    );
    targets.forEach((el) => el.classList.add("rv"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rv-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el, i) => {
      el.style.setProperty("--rv-d", `${(i % 4) * 0.08}s`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <>
      <section className="hero">
        {projects.map((x, i) => (
          <a
            key={x.slug}
            className={"hero-slide" + (slide === i ? " on" : "")}
            style={{ backgroundImage: `url("${x.image}")` }}
            href={"#/" + x.slug}
            aria-hidden={slide !== i}
            tabIndex={slide === i ? 0 : -1}
          />
        ))}
        <div className="hero-veil" aria-hidden="true" />
        <div className="container hero-content">
          <span className="eyebrow eyebrow-light">
            PROPERTY. PURPOSE. POSSIBILITY.
          </span>
          <h1>
            Your Future.
            <br />
            <em>A Stronger Foundation.</em>
          </h1>
          <p>
            Explore residential and commercial property opportunities in Lahore
            with Bunyaad Holdings. Discover projects for your next home or
            business space, with guidance from your first enquiry to the next
            step.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#/projects">
              Explore Projects <ArrowUpRight size={17} />
            </a>
            <a
              className="btn btn-outline"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} /> WhatsApp Our Team
            </a>
          </div>
          <div className="hero-project">
            <span>FEATURED PROJECT</span>
            <b>{p.name}</b>
            <div className="slider-controls">
              {projects.map((x, i) => (
                <button
                  aria-label={`Show ${x.name}`}
                  className={slide === i ? "dot active" : "dot"}
                  key={x.slug}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="hero-side-label">LAHORE · PAKISTAN</div>
      </section>
      <section className="intro section-pad">
        <div className="container intro-grid">
          <div className="intro-stamp">
            <span>BUILT ON</span>
            <b>TRUST</b>
            <span>GROUNDED IN CLARITY</span>
            <div className="stamp-line" />
          </div>
          <div>
            <span className="eyebrow">WELCOME TO BUNYAAD HOLDINGS</span>
            <h2>
              Property Opportunities.
              <br />
              <em>Personal Guidance.</em>
            </h2>
            <p>
              Bunyaad Holdings brings residential and commercial property
              opportunities together in one place. We help buyers explore flats,
              apartments, shops and business spaces, understand project details
              and identify options that fit their requirements.
            </p>
            <p>
              Alongside our property sales and project marketing work, we
              undertake our own developments. Our approach is built around clear
              communication, practical guidance and lasting customer
              relationships.
            </p>
            <a className="text-link" href="#/about">
              About Bunyaad Holdings <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="projects-section section-pad">
        <div className="container">
          <SectionHead
            center
            eyebrow="A SELECTION OF OPPORTUNITIES"
            title="Explore Our Portfolio"
            copy="Discover our first four featured projects. Explore each development and contact our team for further information or site visit arrangements."
          />
          <div className="project-grid">
            {projects.map((x, i) => (
              <ProjectCard key={x.slug} p={x} i={i} />
            ))}
          </div>
          <div className="center-link">
            <a className="btn btn-navy" href="#/projects">
              View All Projects <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="services section-pad section-dark">
        <div className="container">
          <SectionHead
            rail
            eyebrow="WHAT WE DO"
            title="How We Help You"
            copy="From your first search to a considered next step, our team helps make property exploration clearer."
          />
          <div className="service-grid">
            {[
              [
                House,
                "Residential Property Sales",
                "Explore flats and apartments based on your preferred location, budget and lifestyle requirements.",
              ],
              [
                Building2,
                "Commercial Property Sales",
                "Discover shops, offices and business spaces, with information to help you compare your options.",
              ],
              [
                Handshake,
                "Project Marketing",
                "We connect buyers with selected developer projects and assist with project information, enquiries and site visits.",
              ],
              [
                Compass,
                "Our Own Developments",
                "Alongside project representation, we undertake our own development work. Contact our team to learn more.",
              ],
            ].map(([Icon, title, copy], i) => (
              <div className="service-item" key={title}>
                <span className="service-num">0{i + 1}</span>
                <Icon className="service-icon" size={28} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="why-section">
        <div className="why-image">
          <img
            src={whyImage}
            alt="Contemporary residential architecture"
            loading="lazy"
          />
        </div>
        <div className="why-copy">
          <span className="eyebrow">THE BUNYAAD APPROACH</span>
          <h2>
            A Clearer Path for
            <br />
            <em>Your Next Investment.</em>
          </h2>
          <ul>
            {[
              "Explore residential and commercial investment opportunities with one dedicated point of contact.",
              "We match you with projects that fit your budget and investment goals.",
              "Transparent details on projects, returns, and payment plans.",
              "We handle your enquiries and arrange site visits at your convenience.",
            ].map((t) => (
              <li key={t}>
                <CheckCircle2 size={19} />
                {t}
              </li>
            ))}
          </ul>
          <a className="btn btn-gold" href="#/contact">
            Talk to Our Team <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
