import React from "react";

export default function SectionHead({
  eyebrow,
  title,
  copy,
  center = false,
  rail = false,
}) {
  return (
    <div
      className={`section-head${center ? " center" : ""}${rail ? " rail" : ""}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
