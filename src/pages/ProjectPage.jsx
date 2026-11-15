import React, { useState, useRef } from "react";
import {
  ArrowUpRight,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Sparkles,
  Building2,
  FileText,
} from "lucide-react";
import {
  whatsappMessage,
  projects,
} from "../data/site.js";
import { projectDetails } from "../data/project-details.js";
import PageHero from "../components/PageHero.jsx";
import SectionHead from "../components/SectionHead.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import ContactForm from "../components/ContactForm.jsx";
import NotFound from "../components/NotFound.jsx";

/* Amenities slider — one amenity at a time (arrows, dots, swipe) */
function AmenitySlider({ groups, name, image }) {
  const [i, setI] = useState(0);
  const touch = useRef(null);
  const n = groups.length;
  const go = (d) => setI((i + d + n) % n);

  return (
    <div className="amenity-slider">
      <div
        className="amenity-track"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <div className="amenity-slide" key={i}>
          <div className="amenity-slide-media">
            <img src={groups[i].image || image} alt={groups[i].title} />
            <span className="amenity-index">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="amenity-slide-copy">
            <span className="eyebrow">{name.toUpperCase()} · AMENITY</span>
            <h3>{groups[i].title}</h3>
            <p className="group-intro">{groups[i].intro}</p>
            <ul>
              {groups[i].items.map(([lead, text], j) => (
                <li key={j}>
                  <CheckCircle2 size={16} />
                  <span>
                    <b>{lead}</b> {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="amenity-nav">
        <button onClick={() => go(-1)} aria-label="Previous amenity">
          <ArrowUpRight size={18} style={{ transform: "rotate(-135deg)" }} />
        </button>
        <div className="amenity-dots">
          {groups.map((g, j) => (
            <button
              key={g.title}
              className={j === i ? "on" : ""}
              onClick={() => setI(j)}
              aria-label={g.title}
            >
              {String(j + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next amenity">
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function ProjectPage({ slug }) {
  const p = projects.find((x) => x.slug === slug);
  const d = projectDetails[slug];
  if (!p || !d) return <NotFound />;

  // Enquiry links identify the selected project automatically.
  const requestHref = `#/contact?project=${encodeURIComponent(p.name)}`;
  const siteVisitHref = whatsappMessage(
    `Hello Bunyaad Holdings, I would like to arrange a site visit for ${p.name} (${p.location}).`,
  );
  // Primary label per project spec ("Explore Commercial Options" on Curve).
  const primaryLabel = d.primaryCta || "Request Details";

  return (
    <>
      <PageHero
        eyebrow={`${p.developer.toUpperCase()} · PROJECT PORTFOLIO`}
        title={
          <>
            {p.name}
            <br />
            <em>{d.tagline}</em>
          </>
        }
        image={d.heroImage}
      />

      {/* Banner strip (Royal Atrium) */}
      {d.banner && (
        <div className="project-banner">
          <div className="container">
            <span>{d.banner}</span>
          </div>
        </div>
      )}

      {/* Introduction — per project spec */}
      <section className="section-pad section-tint">
        <div className="container project-detail-grid">
          <div>
            <span className="eyebrow">PROJECT INTRODUCTION</span>
            <h2>
              {p.name}
              <br />
              <em>{d.introHeading || "with Bunyaad Holdings."}</em>
            </h2>
            {d.description.map((t, i) => (
              <p className="desc-para" key={i}>
                {t}
              </p>
            ))}
            <p className="desc-para">{d.contactLine}</p>
            <div className="detail-actions">
              <a className="btn btn-gold" href={requestHref}>
                {primaryLabel} <ArrowUpRight size={17} />
              </a>
              <a
                className="btn btn-outline-dark"
                href={siteVisitHref}
                target="_blank"
                rel="noreferrer"
              >
                Arrange a Site Visit <MessageCircle size={17} />
              </a>
            </div>
          </div>
          <div className="detail-image">
            <img src={d.heroImage} alt={`${p.name} project visual`} />
          </div>
        </div>
      </section>

      {/* Key details — Developer / Location / Property focus / Bunyaad role */}
      <section className="section-pad section-white">
        <div className="container">
          <div className="project-status-row">
            <span className="status-chip">
              <span className="status-dot" />
              {d.status}
            </span>
            {p.type && <span className="status-meta">{p.type}</span>}
          </div>
          <div className="key-details">
            <div>
              <span className="eyebrow">KEY DETAILS</span>
              <h2>
                Project details
                <br />
                <em>at a glance.</em>
              </h2>
              <Building2 className="key-details-icon" size={34} />
            </div>
            <dl>
              <div>
                <dt>Developer</dt>
                <dd>{p.developer}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{d.keyLocation}</dd>
              </div>
              <div>
                <dt>Property focus</dt>
                <dd>{d.keyFocus}</dd>
              </div>
              <div>
                <dt>Bunyaad Holdings’ role</dt>
                <dd>{d.keyRole}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Key features (Royal Atrium) */}
      {d.keyFeatures && (
        <section className="section-pad section-tint">
          <div className="container">
            <SectionHead
              rail
              eyebrow="KEY FEATURES"
              title={
                <>
                  Key <em>features.</em>
                </>
              }
            />
            <div className="highlight-grid">
              {d.keyFeatures.map((h) => (
                <div className="highlight-item" key={h}>
                  <CheckCircle2 size={19} />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature groups (HF projects) */}
      {d.featureGroups && (
        <section className="section-pad section-white">
          <div className="container">
            <SectionHead
              rail
              eyebrow="AMENITIES"
              title={
                <>
                  {d.amenitiesHeading || "Thoughtfully planned at"}{" "}
                  <em>every stage.</em>
                </>
              }
            />
            <AmenitySlider groups={d.featureGroups} name={p.name} image={d.amenitiesImage} />
          </div>
        </section>
      )}

      {/* Special section: Sky Medical Center (Bahria Sky 2) */}
      {d.specialSection && (
        <section className="section-pad section-dark">
          <div className="container">
            <div className="feature-row special-dark">
              <div className="feature-image">
                <img
                  src={d.specialSection.image}
                  alt={d.specialSection.heading}
                  loading="lazy"
                />
              </div>
              <div>
                <span className="eyebrow eyebrow-light">
                  {d.specialSection.eyebrow.toUpperCase()}
                </span>
                <h2>{d.specialSection.heading}</h2>
                {d.specialSection.paragraphs.map((t, i) => (
                  <p key={i} style={{ marginTop: 14 }}>
                    {t}
                  </p>
                ))}
                {d.specialSection.services && (
                  <div className="highlight-grid" style={{ marginTop: 22 }}>
                    {d.specialSection.services.map((f) => (
                      <div className="highlight-item" key={f}>
                        <CheckCircle2 size={19} color="#d0b47a" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Amenities list (Bahria Sky 2) */}
      {d.amenities && (
        <section className="section-pad section-tint">
          <div className="container">
            <SectionHead
              rail
              eyebrow="AMENITIES"
              title={
                <>
                  A world of <em>amenities.</em>
                </>
              }
              copy={d.amenitiesIntro}
            />
            <div className="amenity-tags">
              {d.amenities.map((a) => (
                <span className="amenity-tag" key={a}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities list (Bahria Sky 2) */}
      {d.facilities && (
        <section className="section-pad section-white">
          <div className="container">
            <SectionHead
              center
              eyebrow="WORLD CLASS AMENITIES"
              title={
                <>
                  World class <em>amenities.</em>
                </>
              }
              copy={d.facilitiesIntro}
            />
            <div className="highlight-grid">
              {d.facilities.map((f) => (
                <div className="highlight-item" key={f}>
                  <CheckCircle2 size={19} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Investment (Bahria Sky 2) */}
      {d.investment && (
        <section className="section-pad section-tint">
          <div className="container project-detail-grid">
            <div>
              <span className="eyebrow">INVESTMENT</span>
              <h2>
                The future of investment <em>starts here.</em>
              </h2>
              <p className="desc-para">{d.investment}</p>
            </div>
            {d.investmentImage && (
              <div className="detail-image">
                <img src={d.investmentImage} alt="Investment at Bahria Sky 2" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Image features */}
      {d.imageFeatures && (
        <section className={`section-pad ${d.investment || d.specialSection ? "section-white" : "section-tint"}`}>
          <div className="container">
            <SectionHead
              rail
              eyebrow="INSIDE THE PROJECT"
              title={
                <>
                  A closer <em>look.</em>
                </>
              }
            />
            <div className="feature-stack">
              {d.imageFeatures.map((s) => (
                <div className="feature-row" key={s.title}>
                  <div className="feature-image">
                    <img src={s.image} alt={s.title} loading="lazy" />
                  </div>
                  <div>
                    {s.heading ? (
                      <>
                        <span className="eyebrow">{s.title.toUpperCase()}</span>
                        <h3>{s.heading}</h3>
                      </>
                    ) : (
                      <h3>{s.title}</h3>
                    )}
                    <p>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location block */}
      {d.locationBlock && (
        <section className="section-pad section-dark">
          <div className="container">
            <SectionHead
              center
              eyebrow={d.locationBlock.eyebrow || "PRIME LOCATION"}
              title={d.locationBlock.heading}
              copy={d.locationBlock.text}
            />
            {d.locationBlock.intro && (
              <p className="location-intro">{d.locationBlock.intro}</p>
            )}
            {d.locationBlock.distances && (
              <div className="distance-grid">
                {d.locationBlock.distances.map((x) => (
                  <div className="distance-card" key={x.place}>
                    <b>{x.time}</b>
                    <span>{x.place}</span>
                  </div>
                ))}
              </div>
            )}
            {d.locationBlock.nearby && (
              <div className="nearby-grid">
                {d.locationBlock.nearby.map((n) => (
                  <div className="nearby-card" key={n.title}>
                    <h4>{n.title}</h4>
                    <ul>
                      {n.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {d.locationBlock.sub && (
              <p className="location-sub">
                <MapPin size={15} /> {d.locationBlock.sub}
              </p>
            )}
            {d.locationBlock.mapUrl && (
              <div style={{ textAlign: "center", marginTop: 18 }}>
                <a
                  className="text-link"
                  href={d.locationBlock.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={15} /> Open in Google Maps
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Milestones completed/progress (Bahria Sky 2) */}
      {d.milestones && (
        <section className="section-pad section-white">
          <div className="container">
            <div className="milestone-cols">
              <div>
                <h3>
                  <span className="milestone-dot done" /> Completed
                </h3>
                <ul className="milestone-list">
                  {d.milestones.completed.map((m, i) => (
                    <li key={i}>
                      <CheckCircle2 size={17} />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>
                  <span className="milestone-dot prog" /> In Progress
                </h3>
                <ul className="milestone-list">
                  {d.milestones.progress.map((m, i) => (
                    <li key={i}>
                      <Sparkles size={17} />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline (HF projects) */}
      {d.timeline && (
        <section className="section-pad section-tint">
          <div className="container">
            <SectionHead
              rail
              eyebrow="DEVELOPMENT PROGRESS"
              title={
                <>
                  Project <em>timeline.</em>
                </>
              }
              copy={d.timelineHeading}
            />
            <div className="timeline">
              {d.timeline.map((t) => (
                <div className="timeline-item" key={t.period}>
                  <span className="timeline-period">{t.period}</span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="gallery-section">
        <div className="container">
          <SectionHead
            eyebrow="PROJECT GALLERY"
            title={d.galleryHeading || "A closer look"}
          />
          <div className="gallery-grid">
            {d.gallery.map((src, i) => (
              <img key={i} src={src} alt={`${p.name} gallery ${i + 1}`} loading="lazy" />
            ))}
          </div>
          {(d.constructionNote || d.galleryIncludesRenders) && (
            <div className="gallery-note">
              <Sparkles size={20} />
              <span>
                {[
                  d.constructionNote,
                  d.galleryIncludesRenders &&
                    "Gallery includes architectural renders illustrating proposed designs.",
                ]
                  .filter(Boolean)
                  .join(" ")}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry form — identifies the selected project automatically */}
      <section className="section-pad section-white">
        <div className="container enquiry-embed">
          <div>
            <span className="eyebrow">PROJECT ENQUIRY</span>
            <h2>
              Enquire about
              <br />
              <em>{p.name}.</em>
            </h2>
            <p className="desc-para">
              Tell us your requirement and our team will share project details,
              availability and site visit options.
            </p>
            <a className="text-link" href="#/contact">
              Prefer the full contact page? <ArrowUpRight size={15} />
            </a>
          </div>
          <ContactForm project={p.name} />
        </div>
      </section>

      {/* Shared note (per project spec) */}
      <div className="container">
        <p className="legal-note">
          <FileText size={13} /> Project information, availability and purchase
          terms are subject to confirmation. Renderings illustrate proposed
          designs. Please review the relevant project documents before booking.
        </p>
      </div>

      {/* Contact buttons */}
      <ContactCTA
        title={
          <>
            Interested in {p.name}?
            <br />
            <em>Talk to Our Team.</em>
          </>
        }
        copy={`Contact Bunyaad Holdings about ${p.name} in ${p.location} — by phone, WhatsApp or the enquiry form.`}
      />
    </>
  );
}
