import React from "react";
import { ArrowUpRight } from "lucide-react";
import PageHero from "./PageHero.jsx";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="PAGE NOT FOUND"
      title={
        <>
          Let’s get you
          <br />
          <em>back on track.</em>
        </>
      }
      copy="The page you’re looking for may have moved."
    />
  );
}
