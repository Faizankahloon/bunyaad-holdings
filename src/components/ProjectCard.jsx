import React from "react";
import { ArrowUpRight, ArrowRight, MapPin } from "lucide-react";

export default function ProjectCard({ p, i = 0 }) {
  return (
    <article className="project-card">
      <a className="project-image" href={"#/" + p.slug}>
        <img
          src={p.image}
          alt={`${p.name} architectural project visual`}
          loading="lazy"
        />
        <span className="image-index">0{i + 1}</span>
        <span className="image-arrow">
          <ArrowUpRight />
        </span>
      </a>
      <div className="project-info">
        <div className="project-meta">
          <span>{p.type}</span>
          <span>{p.developer}</span>
        </div>
        <div className="project-title-row">
          <h3>{p.name}</h3>
          <a className="btn btn-outline-dark card-btn" href={"#/" + p.slug}>
            View Project <ArrowRight size={15} />
          </a>
        </div>
        <p className="project-location">
          <MapPin size={13} /> {p.location}
        </p>
        <p>{p.description}</p>
      </div>
    </article>
  );
}
