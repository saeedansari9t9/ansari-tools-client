import React, { useState } from "react";
import { Check, ChevronDown, ArrowUpRight } from "lucide-react";
import { useReveal, useCardSheen } from "./useHomeMotion";

const WHATSAPP = "923227866655";

const BASE = [
  "Semrush",
  "Moz Pro",
  "Ubersuggest",
  "Quillbot Premium",
  "Canva Pro",
  "Grammarly",
  "WordTune",
  "VistaCreate",
  "SeoPtimer",
  "PicMonkey",
];

const PLANS = [
  {
    id: "student",
    name: "Student",
    price: "1199",
    blurb: "Essential tools to get moving.",
    tools: BASE,
    featured: false,
  },
  {
    id: "agency",
    name: "Agency",
    price: "2999",
    blurb: "The full arsenal, nothing held back.",
    featured: true,
    tools: [
      ...BASE,
      "Envato Elements",
      "StoryBlock",
      "Viral Launch",
      "VidiQ Boost",
      "Motion Array",
      "Capcut Pro",
      "SkillShare",
      "Helium 10",
      "PicsArt Pro",
      "Pocdora",
      "Niche Scraper",
      "WriteSonic",
      "Design.Ai",
      "Prezi",
      "You.com",
      "Turnitin",
      "Coursera Plus",
      "Placeit",
      "Jasper AI",
      "Perplexity AI",
      "LongTailPro",
      "Word.ai",
    ],
  },
  {
    id: "blogging",
    name: "Blogging",
    price: "1999",
    blurb: "Built for publishing at pace.",
    featured: false,
    tools: [
      ...BASE,
      "WriteSonic",
      "Design.Ai",
      "Prezi",
      "You.com",
      "Turnitin",
      "Coursera Plus",
      "Jasper AI",
      "Perplexity AI",
      "LongTailPro",
      "Word.ai",
    ],
  },
];

const order = (name, price) => {
  const msg = `Hello! I'm interested in subscribing to the ${name} Plan (PKR ${price}/month). Please guide me with the activation process.`;
  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener,noreferrer"
  );
};

const PricingSection = () => {
  const revealRef = useReveal({ selector: ".plan-card", stagger: 0.12, y: 44 });
  const sheenRef = useCardSheen();

  return (
    <section id="pricing" className="ht-section relative overflow-hidden py-20 sm:py-28">
      <div
        className="ht-glow"
        style={{
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40rem",
          height: "24rem",
          background: "rgba(124,58,237,0.26)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          index="02"
          kicker="Pricing"
          title="Pick the plan that fits"
          copy="Monthly billing in PKR. Cancel whenever you like — no lock-in, no setup fee."
        />

        <div
          ref={revealRef}
          className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-start"
        >
          <div ref={sheenRef} className="contents">
            {PLANS.map((p) => (
              <PlanCard key={p.id} plan={p} />
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-[13px] text-[#6b6184]">
          Every plan ships private accounts, activated within 24 hours. 7-day
          money-back guarantee.
        </p>
      </div>
    </section>
  );
};

const PlanCard = ({ plan }) => {
  const [open, setOpen] = useState(false);
  const visible = open ? plan.tools : plan.tools.slice(0, 7);
  const hidden = plan.tools.length - 7;

  return (
    <article
      className={`plan-card ht-card overflow-hidden p-7 sm:p-8 ${
        plan.featured ? "ht-card--featured lg:-mt-4" : ""
      }`}
    >
      <div className="ht-card__sheen" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              {plan.name}
            </h3>
            <p className="mt-1 text-[13px] text-[#9c92b8]">{plan.blurb}</p>
          </div>
          {plan.featured && (
            <span className="ht-label shrink-0 rounded-full border border-[#a78bfa]/30 bg-[#7c3aed]/15 px-3 py-1 text-[#c4b5fd]">
              Popular
            </span>
          )}
        </div>

        <div className="mt-7 flex items-baseline gap-2">
          <span className="text-[2.75rem] font-extrabold leading-none tracking-tight text-white">
            {plan.price}
          </span>
          <span className="text-sm font-semibold text-[#9c92b8]">PKR / mo</span>
        </div>

        <button
          type="button"
          onClick={() => order(plan.name, plan.price)}
          className={`ht-btn mt-7 w-full py-3.5 text-[15px] ${
            plan.featured
              ? "ht-btn--primary ht-btn__sweep"
              : "ht-btn--ghost"
          }`}
          data-cursor-text="ORDER"
        >
          Get {plan.name}
          <ArrowUpRight className="h-[17px] w-[17px]" />
        </button>

        <div className="mt-8 h-px bg-white/[0.07]" />

        <ul className="mt-6 space-y-3">
          {visible.map((t) => (
            <li key={t} className="flex items-center gap-3">
              <Check className="h-4 w-4 shrink-0 text-[#a78bfa]" />
              <span className="text-[13.5px] text-white/80">{t}</span>
            </li>
          ))}
        </ul>

        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="ht-label mt-6 inline-flex items-center gap-1.5 text-[#a78bfa] transition-colors hover:text-white"
          >
            {open ? "Show less" : `+${hidden} more tools`}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-400 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </article>
  );
};

/* Shared section header: mono index + kicker, oversized title, lede. */
export const SectionHead = ({ index, kicker, title, copy, align = "left" }) => (
  <header className={align === "center" ? "text-center" : ""}>
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="ht-label">
        <span className="ht-label__num">{index}</span> &nbsp;/&nbsp; {kicker}
      </span>
      <span className="h-px w-16 bg-white/10" />
    </div>
    <h2 className="ht-display mt-5 text-[clamp(2rem,5.2vw,3.5rem)] text-white">
      {title}
    </h2>
    {copy && (
      <p
        className={`mt-4 max-w-xl text-[15px] leading-relaxed text-[#9c92b8] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {copy}
      </p>
    )}
  </header>
);

export default PricingSection;
