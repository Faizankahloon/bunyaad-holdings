import React from "react";

export default function PageHero({ eyebrow, title, copy, image, variant, half }) {
  return (
    <section
      className={
        "page-hero" +
        (variant ? " page-hero--" + variant : "") +
        (half ? " page-hero--half" : "")
      }
      style={
        image
          ? {
              backgroundImage:
                "linear-gradient(120deg, rgba(18,38,58,.95), rgba(18,38,58,.84))",
            }
          : undefined
      }
    >
      {/* Hero image on its own layer so it can zoom slowly like the Home hero */}
      {image && (
        <div
          className="page-hero-bg"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      )}
      <div className="container">
        <span className="eyebrow eyebrow-light">{eyebrow}</span>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
    </section>
  );
}
