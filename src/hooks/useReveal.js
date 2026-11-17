import { useEffect } from "react";

// Scroll-triggered reveal for every page. Adds the shared .rv / .rv-in
// classes (defined in styles.css inside the no-reduced-motion media query)
// to common page elements and staggers them slightly. Runs again whenever
// the route (dep) changes. Respects prefers-reduced-motion.
const SELECTOR = [
  ".section-head",
  ".project-card",
  ".value-card",
  ".stat-card",
  ".fact-card",
  ".unit-type-card",
  ".plan-card",
  ".pricing-card",
  ".distance-card",
  ".nearby-card",
  ".highlight-item",
  ".timeline-item",
  ".overview-cta-card",
  ".overview-glance",
  ".contact-form",
  ".contact-aside > a",
  ".contact-address",
  ".key-details > div",
  ".intro-grid > *",
  ".project-detail-grid > div",
  ".overview-layout > div",
  ".feature-row",
  ".feature-group",
  ".desc-para",
  ".location-intro",
  ".why-list",
  ".payment-plan-notes",
  ".contact-layout > div",
  ".about-layout > div",
  ".enquiry-embed > div",
  ".development-panel > div",
  ".legal-block",
  ".feature-group",
  ".key-feature-tile",
  ".amenity-tag",
  ".video-frame",
  ".gallery-placeholder",
  ".cta-inner > *",
  ".center-link",
].join(", ");

export default function useReveal(dep) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(SELECTOR);
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
  }, [dep]);
}
