import React, { useState } from "react";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import { projects } from "../data/site.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [projOpen, setProjOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const path = location.hash.slice(1) || "/";
  const links = [
    ["Home", "/"],
    ["About Us", "/about"],
    ["Projects", "/projects"],
    ["Our Developments", "/developments"],
  ];
  return (
    <header className={"header" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-wrap">
        <a className="brand" href="#/" onClick={() => setOpen(false)}>
          <span className="brand-mark">B</span>
          <span>
            <b>BUNYAAD</b>
            <small>HOLDINGS</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav open" : "nav"}>
          {links.map(([label, url]) => (
            <div className="nav-item" key={url}>
              <a
                className={path === url ? "active" : ""}
                href={"#" + url}
                onClick={(e) => {
                  if (label === "Projects") {
                    e.preventDefault();
                    setProjOpen((v) => !v);
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {label}
                {label === "Projects" && (
                  <ChevronDown
                    size={13}
                    style={{
                      transform: projOpen ? "rotate(180deg)" : "none",
                      transition: "transform .25s",
                    }}
                  />
                )}
              </a>
              {label === "Projects" && (
                <div className={"dropdown" + (projOpen ? " show" : "")}>
                  {projects.map((p) => (
                    <a key={p.slug} href={"#/" + p.slug}>
                      <img src={p.image} alt="" loading="lazy" />
                      <span className="drop-name">{p.name}</span>
                      <span className="drop-meta">{p.location}</span>
                      <ArrowUpRight size={15} className="drop-arrow" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <a
          className="btn btn-gold nav-cta"
          href="#/contact"
          onClick={() => setOpen(false)}
        >
          Enquire Now <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  );
}
