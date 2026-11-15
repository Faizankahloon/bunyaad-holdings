import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import MobileActionBar from "./components/MobileActionBar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import Contact from "./pages/Contact.jsx";
import Developments from "./pages/Developments.jsx";
import Legal from "./pages/Legal.jsx";
import { projects } from "./data/site.js";

// Basic per-page SEO: title + description + social preview tags are
// updated on every route change.
function setMeta(name, content) {
  const el =
    document.head.querySelector(`meta[name="${name}"]`) ||
    document.head.querySelector(`meta[property="${name}"]`);
  if (el) el.setAttribute("content", content);
}

const STATIC_META = {
  "/": {
    title: "Bunyaad Holdings | Your Future. A Stronger Foundation.",
    description:
      "Explore residential and commercial property opportunities in Lahore with Bunyaad Holdings. Property sales, project marketing and our own developments.",
  },
  "/about": {
    title: "About Us | Bunyaad Holdings",
    description:
      "Bunyaad Holdings is a Lahore-based property sales, project marketing and real estate development company.",
  },
  "/projects": {
    title: "Projects | Bunyaad Holdings",
    description:
      "Browse our featured residential and commercial projects in Lahore, then contact our team to discuss your requirements.",
  },
  "/developments": {
    title: "Our Developments | Bunyaad Holdings",
    description:
      "Development is part of the Bunyaad Holdings story. Alongside property sales and project marketing, we undertake our own development projects.",
  },
  "/contact": {
    title: "Contact Us | Bunyaad Holdings",
    description:
      "Contact Bunyaad Holdings by phone, WhatsApp or enquiry form. 630 Block R, Model Town, Lahore.",
  },
  "/privacy-notice": {
    title: "Privacy Notice | Bunyaad Holdings",
    description:
      "How Bunyaad Holdings handles the details you share through this website.",
  },
  "/website-terms": {
    title: "Website Terms | Bunyaad Holdings",
    description: "Terms for using the Bunyaad Holdings website.",
  },
};

export default function App() {
  const [hash, setHash] = useState(location.hash.slice(1) || "/");
  useEffect(() => {
    const fn = () => {
      setHash(location.hash.slice(1) || "/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  // Support query strings inside the hash, e.g. #/contact?project=curve
  const [path, search] = hash.split("?");
  const params = new URLSearchParams(search || "");
  const projectParam = params.get("project") || "";
  const slug = path.replace("/", "");

  // ── Per-page SEO tags ──
  useEffect(() => {
    const project = projects.find((p) => p.slug === slug);
    const meta = project
      ? {
          title: `${project.name} — ${project.location} | Bunyaad Holdings`,
          description: `${project.description} Project sales and marketing by Bunyaad Holdings. Contact our team for details and site visits.`,
        }
      : (STATIC_META[path] || STATIC_META["/"]);
    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("og:title", meta.title);
    setMeta("og:description", meta.description);
  }, [path, slug]);

  let page;
  if (path === "/") page = <Home />;
  else if (path === "/about") page = <About />;
  else if (path === "/projects") page = <Projects />;
  else if (path === "/contact") page = <Contact project={projectParam} />;
  else if (path === "/developments") page = <Developments />;
  else if (path === "/privacy-notice") page = <Legal page="privacy" />;
  else if (path === "/website-terms") page = <Legal page="terms" />;
  else page = <ProjectPage slug={slug} />;

  return (
    <>
      <Header />
      <main>{page}</main>
      <Footer />
      <WhatsAppFloat />
      <MobileActionBar />
    </>
  );
}
