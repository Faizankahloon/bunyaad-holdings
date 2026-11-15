import React from "react";

export default function PageHero({ eyebrow, title, copy, image, variant }) {
  return (
    <section
      className={"page-hero" + (variant ? " page-hero--" + variant : "")}
      style={
        image
          ? {
              backgroundImage:
                "linear-gradient(120deg, rgba(18,38,58,.94), rgba(18,38,58,.72)), url(" +
                image +
                ")",
            }
          : undefined
      }
    >

      <div className="container">
        <span className="eyebrow eyebrow-light">{eyebrow}</span>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
    </section>
  );
}
