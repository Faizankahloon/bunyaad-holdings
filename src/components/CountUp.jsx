import { useEffect, useRef, useState } from "react";

// Animates a numeric value from 0 up to its target when it scrolls into
// view. Understands values like "275,000+", "250+", "PKR 500,000":
// the non-numeric prefix/suffix stay static, only the digits count up.
export default function CountUp({ value, duration = 2400 }) {
  const text = String(value);
  const match = text.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const ref = useRef(null);
  const [display, setDisplay] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    if (!match) return; // nothing numeric to animate
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const prefix = match[1];
    const digits = match[2];
    const suffix = match[3];
    const decimals = (digits.split(".")[1] || "").length;
    const target = parseFloat(digits.replace(/,/g, ""));
    const grouped = digits.includes(","); // keep the comma formatting
    const fmt = (n) =>
      grouped
        ? n.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : n.toFixed(decimals);

    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          // ease-in-out quart: starts gently, flows, then settles softly
          const eased =
            t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
          setDisplay(prefix + fmt(target * eased) + suffix);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(text); // land on the exact original string
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    if (node) io.observe(node);
    return () => io.disconnect();
  }, [text, duration, match]);

  if (!match) return <>{text}</>;
  return <span ref={ref}>{display}</span>;
}
