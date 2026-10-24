import React from "react";

const BRANDS = [
  "Canva Pro",
  "ChatGPT Plus",
  "Semrush",
  "Moz Pro",
  "Jasper AI",
  "Grammarly",
  "Envato Elements",
  "CapCut Pro",
  "Perplexity AI",
  "Coursera Plus",
  "Helium 10",
  "Quillbot",
  "Midjourney",
  "Adobe CC",
];

/* The track renders the list twice so the -50% keyframe loops seamlessly.
   The duplicate is aria-hidden to keep it out of the accessibility tree. */
const Group = ({ clone = false }) => (
  <ul
    className="flex shrink-0 items-center"
    aria-hidden={clone || undefined}
  >
    {BRANDS.map((b) => (
      <li key={b} className="flex items-center gap-7 px-7">
        <span className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.2em] text-white/35 transition-colors duration-300 hover:text-white/80">
          {b}
        </span>
        <span className="h-1 w-1 shrink-0 rounded-full bg-[#7c3aed]/60" />
      </li>
    ))}
  </ul>
);

const BrandMarquee = () => (
  <div className="hero-marquee ht-marquee border-y border-white/[0.07] py-5">
    <div className="ht-marquee__track">
      <Group />
      <Group clone />
    </div>
  </div>
);

export default BrandMarquee;
