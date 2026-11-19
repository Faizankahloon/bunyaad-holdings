import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Building2 } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import SectionHead from "../components/SectionHead.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import gallery1 from "../assets/images/developments/gallery-1.webp";
import gallery2 from "../assets/images/developments/gallery-2.webp";
import gallery3 from "../assets/images/developments/gallery-3.webp";
import gallery4 from "../assets/images/developments/gallery-4.webp";
import gallery5 from "../assets/images/developments/gallery-5.webp";
import gallery6 from "../assets/images/developments/gallery-6.webp";
// Unsplash (free license): Islamabad scaffolding — Mudassir Zaheer;
// Karachi site crew — Jalal Ajmal; tower crane — Adrian Sulyok;
// Karachi skyline — Muneer Ahmed OK.
import gallery7 from "../assets/images/developments/gallery-7.webp";
import gallery8 from "../assets/images/developments/gallery-8.webp";
import gallery9 from "../assets/images/developments/gallery-9.webp";
import gallery10 from "../assets/images/developments/gallery-10.webp";

const GALLERY = [
  { src: gallery1, alt: "Construction team fixing steel reinforcement on site", caption: "Reinforcement Works" },
  { src: gallery2, alt: "Concrete frame of a building under construction", caption: "Structural Frame" },
  { src: gallery3, alt: "Construction workers on scaffolding during a build", caption: "On-Site Team" },
  { src: gallery4, alt: "Excavation and earthworks at a development site", caption: "Earthworks" },
  { src: gallery5, alt: "Workers assembling steel columns for a new structure", caption: "Steel & Formwork" },
  { src: gallery6, alt: "Site survey and progress review at a construction project", caption: "Site Survey" },
  { src: gallery7, alt: "Worker on scaffolding in front of a tall building under construction in Islamabad, Pakistan", caption: "Islamabad Scaffolding" },
  { src: gallery8, alt: "Construction workers building on site in Karachi, Pakistan", caption: "Karachi Site Crew" },
  { src: gallery9, alt: "Tower crane over a building under construction", caption: "Tower Crane" },
  { src: gallery10, alt: "Karachi high-rise skyline and urban development in Pakistan", caption: "Karachi Skyline" },
];

// Our Developments — kept separate from the four represented projects.
// No placeholder development cards; project details will be added as
// they become available.
export default function Developments() {
  const trackRef = useRef(null);
  const [slide, setSlide] = useState(0);

  // Advance one image every 2 seconds. The image set is duplicated, so
  // after the last slide we reset silently and the loop looks continuous.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setSlide((s) => s + 1), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!card) return;

    const move = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = card.offsetWidth + gap;
      track.style.transform = `translateX(${-slide * step}px)`;
    };

    // Completed a full set: jump back to the identical start frame.
    if (slide > GALLERY.length) {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      void track.offsetHeight;
      track.style.transition = "";
      setSlide(0);
      return;
    }

    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [slide]);

  return (
    <>
      <PageHero
        half
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
            <div className="dev-stats">
              {[
                { value: "20+", label: "Years Experience" },
                { value: "2357+", label: "Project Handovers" },
                { value: "50+", label: "Ongoing Projects" },
              ].map((stat) => (
                <article className="dev-stat-card" key={stat.label}>
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad section-tint dev-gallery-section">
        <div className="container">
          <SectionHead
            rail
            eyebrow="DEVELOPMENTS GALLERY"
            title={
              <>
                Built from the
                <br />
                <em>ground up.</em>
              </>
            }
            copy="A closer look at the construction work behind our development projects."
          />
          <div className="dev-gallery">
            <div className="dev-gallery-track" ref={trackRef}>
              {[...GALLERY, ...GALLERY].map((g, i) => (
                <figure
                  className="dev-gallery-card"
                  key={`${g.caption}-${i}`}
                  aria-hidden={i >= GALLERY.length ? "true" : undefined}
                >
                  <img src={g.src} alt={g.alt} loading="lazy" />
                  <figcaption>
                    <span>
                      {String((i % GALLERY.length) + 1).padStart(2, "0")}
                    </span>
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
