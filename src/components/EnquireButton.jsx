import React from "react";
import { ArrowUpRight } from "lucide-react";

// Scrolls to top when the target hash is already the current one.
export function go(path) {
  location.hash = path;
  window.scrollTo(0, 0);
}

export default function EnquireButton({
  children = "Enquire Now",
  className = "",
}) {
  return (
    <a
      className={`btn btn-gold ${className}`}
      href="#contact"
      onClick={() => {
        if (location.hash === "#contact") window.scrollTo(0, 0);
      }}
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
