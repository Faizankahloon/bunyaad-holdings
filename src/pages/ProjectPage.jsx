import React, { useState, useRef, useEffect } from "react";
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

// Development progress: date buttons switching photo groups
function DevGroups({ groups, name }) {
  const [active, setActive] = useState(0);
  const g = groups[active];
  return (
    <div className="dev-groups">
      <h3>Development progress</h3>
      <div className="dev-groups-tabs">
        {groups.map((x, i) => (
          <button
            key={x.label}
            className={i === active ? "active" : ""}
            onClick={() => setActive(i)}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="dev-groups-row" key={g.label}>
        {g.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${name} development — ${g.label} ${i + 1}`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

// Gallery: one card slides left every 2 seconds
function GalleryStrip({ images, alt }) {
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(true);
  const STEP = 354; // 340px card + 14px gap
  useEffect(() => {
    const t = setInterval(() => setIdx((v) => v + 1), 2000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (idx >= images.length) {
      // snap back to start without visible movement
      const t = setTimeout(() => {
        setAnim(false);
        setIdx(0);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [idx, images.length]);
  return (
    <div className="gallery-strip">
      <div
        className="gallery-strip-track"
        style={{
          transform: `translateX(${-idx * STEP}px)`,
          transition: anim ? "transform 1.1s cubic-bezier(.25,.1,.25,1)" : "none",
        }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={i < images.length ? alt(i) : ""}
            loading="lazy"
            aria-hidden={i >= images.length}
          />
        ))}
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

      {/* Project scale stats (Bahria Sky 2) */}
      {d.stats && (
        <section className="stats-strip" aria-label={`${p.name} at a glance`}>
          <div className="container stats-grid">
            {d.stats.map((s) => (
              <div className="stat-block" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Introduction — per project spec */}
      <section className={`section-pad section-tint section-rule${slug === "curve" ? " curve-intro-section" : slug === "sky-tree-tower" ? " sky-tree-intro-section" : ""}`}>
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

      {/* Booking amounts (Royal Atrium Mall) */}
      {d.pricing && (
        <section className="section-pad section-dark booking-dark" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="container">
            <SectionHead
              center
              eyebrow="BOOKING"
              title={
                <>
                  {d.pricing.heading} <em>details.</em>
                </>
              }
              copy={d.pricing.note}
            />
            <div className="pricing-grid">
              {d.pricing.items.map((x) => (
                <div className="pricing-card" key={x.label}>
                  <b>{x.value}</b>
                  <span>{x.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full overview copy */}
      {d.overview && (
        <section className={`section-pad overview-section section-rule${slug === "curve" ? " curve-overview-section" : slug === "sky-tree-tower" ? " sky-tree-overview-section" : ""}`}>
          <div className="container overview-layout">
            <div>
              <span className="eyebrow">OVERVIEW</span>
              <h2>
                About
                <br />
                <em>{p.name}.</em>
              </h2>
            </div>
            <div>
              {d.overview.paragraphs.map((t, i) => (
                <p className="desc-para" key={i}>
                  {t}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project film (Bahria Sky 2) */}
      {d.videoUrl && (
        <section className="section-pad section-dark section-rule">
          <div className="container" style={{ maxWidth: 980 }}>
            <SectionHead
              center
              eyebrow="WATCH THE FILM"
              title={
                <>
                  {p.name} <em>in motion.</em>
                </>
              }
            />
            <div className="video-frame">
              <iframe
                src={d.videoUrl}
                title={d.videoTitle || `${p.name} video`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Construction progress timeline (Bahria Sky 2) */}
      {d.constructionImages && (
        <section className="section-pad section-tint section-rule">
          <div className="container">
            <SectionHead
              rail
              eyebrow="CONSTRUCTION"
              title={
                <>
                  Progress <em>on site.</em>
                </>
              }
              copy="Monthly construction photographs, from groundbreaking to the latest update."
            />
            <div className="construction-strip">
              {d.constructionImages.map((c, ci) => (
                <figure className="construction-card" key={c.label}>
                  <div className="construction-media">
                    <img src={c.image} alt={`${p.name} construction — ${c.label}`} loading="lazy" />
                    <span className="construction-badge">
                      <i>{String(d.constructionImages.length - ci).padStart(2, "0")}</i>
                      {c.label}
                    </span>
                  </div>
                  <figcaption>Site progress · {c.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key details — Developer / Location / Property focus / Bunyaad role */}
      <section className={`section-pad section-white section-rule${slug === "curve" ? " curve-details-section" : slug === "sky-tree-tower" ? " sky-tree-details-section" : ""}`}>
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
              {(d.facts || []).map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Key features (Royal Atrium) */}
      {d.keyFeatures && (
        <section className={`section-pad section-dark section-rule${slug === "curve" ? " curve-location-section" : ""}`}>
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
            <div className="key-feature-tiles">
              {d.keyFeatures.map((h, i) => (
                <div className="key-feature-tile" key={h}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{h}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature groups (HF projects) */}
      {d.featureGroups && (
        <section className={`section-pad section-white section-rule${slug === "curve" ? " curve-amenities-section" : slug === "sky-tree-tower" ? " sky-tree-amenities-section" : ""}`}>
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
        <section className="section-pad section-dark section-rule">
          <div className="container">
            <div className="feature-row special-dark">
              <div className="feature-image">
                <img
                  src={d.specialSection.image}
                  alt={d.specialSection.heading}
                  loading="lazy"
                />
                {d.specialSection.images &&
                  d.specialSection.images.slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${d.specialSection.heading} — view ${i + 2}`}
                      loading="lazy"
                      className="special-sub"
                    />
                  ))}
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
        <section className={`section-pad section-tint section-rule${slug === "curve" ? " curve-timeline-section" : ""}`}>
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
        <section className={`section-pad section-white section-rule${slug === "curve" ? " curve-payment-section" : ""}`}>
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
        <section className="section-pad section-tint section-rule">
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
        <section className="section-pad section-rule project-look-section">
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
                      <>
                        <span className="eyebrow">{s.title.toUpperCase()}</span>
                        <h3>{s.title}</h3>
                      </>
                    )}
                    <p>{s.text}</p>
                    {s.gallery && (
                      <div className="feature-subgallery">
                        {s.gallery.map((g, gi) => (
                          <img key={gi} src={g} alt={`${s.title} — view ${gi + 1}`} loading="lazy" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floor plans (Bahria Sky 2) */}
      {d.floorPlans && (
        <section className="section-pad section-rule floor-plans-section">
          <div className="container">
            <SectionHead
              rail
              eyebrow="PLANS"
              title={
                <>
                  Floor plans <em>and layouts.</em>
                </>
              }
              copy="Site plan and floor-by-floor layouts. Open any plan to view it in full size."
            />
            <div className="plans-grid">
              {d.floorPlans.map((f) => (
                <a
                  className="plan-card"
                  key={f.label}
                  href={f.image}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={f.image} alt={`${p.name} — ${f.label}`} loading="lazy" />
                  <span>{f.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Apartment plans (Bahria Sky 2) */}
      {d.apartmentPlans && (
        <section className="section-pad section-rule apartment-plans-section">
          <div className="container">
            <SectionHead
              rail
              eyebrow="APARTMENT PLANS"
              title={
                <>
                  Choose your <em>layout.</em>
                </>
              }
              copy="Apartment layouts with floors, rooms and parking. Unit sizes shown for reference only and subject to confirmation."
            />
            <div className="apartment-plans">
              {d.apartmentPlans.map((a) => (
                <article className="apartment-plan-card" key={a.type}>
                  <h3>{a.type}</h3>
                  <dl>
                    {a.details.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <img src={a.image} alt={`${p.name} — ${a.type} blueprint`} loading="lazy" />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Unit types (Bahria Sky 2) */}
      {d.unitTypes && (
        <section className="section-pad section-white section-rule">
          <div className="container">
            <SectionHead
              center
              eyebrow="UNIT TYPES"
              title={
                <>
                  Find your <em>unit.</em>
                </>
              }
              copy="Residential unit configurations available within the project. Contact our team for availability."
            />
            <div className="unit-types-grid">
              {d.unitTypes.map((u) => (
                <figure className="unit-type-card" key={u.title}>
                  <div className="unit-type-media">
                    <img src={u.image} alt={`${p.name} — ${u.title}`} loading="lazy" />
                    <a
                      className="unit-type-overlay"
                      href={requestHref}
                      aria-label={`Enquire about ${u.title} in ${p.name}`}
                    >
                      <span>Enquire About This Unit <ArrowUpRight size={15} /></span>
                    </a>
                  </div>
                  <figcaption>{u.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location block */}
      {d.locationBlock && (
        <section className={`section-pad section-dark section-rule${slug === "curve" ? " curve-location-section" : slug === "sky-tree-tower" ? " sky-tree-location-section" : ""}`}>
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
            {d.locationBlock.image && (
              <div className="location-map-frame">
                <img
                  src={d.locationBlock.image}
                  alt={`${p.name} neighbourhood map`}
                  loading="lazy"
                />
              </div>
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
        <section className="section-pad section-white section-rule">
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
        <section className={`section-pad section-tint section-rule${slug === "curve" ? " curve-timeline-section" : slug === "sky-tree-tower" ? " sky-tree-timeline-section" : ""}`}>
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
            {d.progressImages && (
              <div className="progress-photos">
                {d.progressImages.map((c) => (
                  <figure key={c.caption}>
                    <img src={c.src} alt={`${p.name} progress — ${c.caption}`} loading="lazy" />
                    <figcaption>{c.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Payment plan (Curve) */}
      {d.paymentPlan && (
        <section className={`section-pad section-white section-rule${slug === "curve" ? " curve-payment-section" : ""}`}>
          <div className="container">
            <SectionHead
              eyebrow="INVESTMENT OPTIONS"
              title={
                <>
                  {d.paymentPlan.heading.replace("Plan", "")}{" "}
                  <em>{d.paymentPlan.heading.split(" ").pop()}.</em>
                </>
              }
              copy={d.paymentPlan.copy}
            />
            <div className="payment-plan-wrap">
              <table className="payment-plan-table">
                <thead>
                  <tr>
                    <th className="pp-category-col">Category</th>
                    {d.paymentPlan.columns.map((c) => (
                      <th key={c.title} className={c.highlight ? "pp-highlight" : ""}>
                        {c.title}
                        {c.sub && <span>{c.sub}</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                {d.paymentPlan.categories.map((cat) => (
                  <tbody key={cat.unit}>
                    {cat.rows.map((row, ri) => (
                      <tr key={ri}>
                        {ri === 0 && (
                          <td rowSpan={cat.rows.length} className="pp-category">
                            <span className="pp-cat-title">{cat.unit}</span>
                            <span className="pp-cat-sub">{cat.subtitle}</span>
                          </td>
                        )}
                        {row.map((v, ci) => (
                          <td key={ci} className={d.paymentPlan.columns[ci].highlight ? "pp-highlight" : ""}>
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
            <ul className="payment-plan-notes">
              {d.paymentPlan.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className={`gallery-section${slug === "curve" ? " curve-gallery-section" : slug === "sky-tree-tower" ? " sky-tree-gallery-section" : ""}`}>
        <div className="container">
          <SectionHead
            eyebrow="PROJECT GALLERY"
            title={d.galleryHeading || "A closer look"}
          />
          <GalleryStrip images={d.gallery} alt={(n) => `${p.name} gallery ${n + 1}`} />
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
          {d.developmentGroups && (
            <DevGroups groups={d.developmentGroups} name={p.name} />
          )}
        </div>
      </section>

      {/* Enquiry form — identifies the selected project automatically */}
      <section className={`section-pad section-white section-rule section-form${slug === "curve" ? " curve-enquiry-section" : slug === "sky-tree-tower" ? " sky-tree-enquiry-section" : ""}`}>
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

        {/* Shared note (per project spec) — inside the same white section */}
        <div className="container">
          <p className="legal-note">
            <FileText size={13} /> Project information, availability and purchase
            terms are subject to confirmation. Renderings illustrate proposed
            designs. Please review the relevant project documents before booking.
          </p>
        </div>
      </section>

      {/* Shared CTA — identical to every other page */}
      <ContactCTA />
    </>
  );
}
