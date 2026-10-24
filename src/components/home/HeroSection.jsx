import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import gsap from "gsap";
import { prefersReducedMotion } from "./useHomeMotion";
import BrandMarquee from "./BrandMarquee";

const STATS = [
  { value: "50+", label: "Premium tools" },
  { value: "10k+", label: "Active users" },
  { value: "24/7", label: "Live support" },
  { value: "90%", label: "Average saving" },
];

const HeroSection = ({ onJump }) => {
  const rootRef = useRef(null);
  const glowARef = useRef(null);
  const glowBRef = useRef(null);

  // Cinematic entrance. Lines rise out of their clip masks, then the
  // supporting content settles in behind them.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.15,
      });

      tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.7 })
        .from(
          ".ht-reveal-line",
          { yPercent: 115, duration: 1.15, stagger: 0.1 },
          "-=0.45"
        )
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.8 }, "-=0.7")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.7 }, "-=0.55")
        .from(
          ".hero-stat",
          { opacity: 0, y: 18, duration: 0.7, stagger: 0.07 },
          "-=0.45"
        )
        .from(
          ".hero-tile",
          { opacity: 0, y: 26, scale: 0.9, duration: 0.8, stagger: 0.06 },
          "-=0.6"
        )
        .from(".hero-marquee", { opacity: 0, duration: 0.9 }, "-=0.5");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Pointer parallax on the background blooms. Desktop only.
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const qA = gsap.quickTo(glowARef.current, "x", { duration: 1.1, ease: "power3" });
    const qAy = gsap.quickTo(glowARef.current, "y", { duration: 1.1, ease: "power3" });
    const qB = gsap.quickTo(glowBRef.current, "x", { duration: 1.3, ease: "power3" });
    const qBy = gsap.quickTo(glowBRef.current, "y", { duration: 1.3, ease: "power3" });

    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      qA(nx * 26);
      qAy(ny * 20);
      qB(nx * -30);
      qBy(ny * -22);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      ref={rootRef}
      className="ht-section relative overflow-hidden pt-14 pb-0 sm:pt-20 lg:pt-24"
    >
      {/* Background stack */}
      <div
        ref={glowARef}
        className="ht-glow"
        style={{
          top: "-14%",
          left: "-6%",
          width: "34rem",
          height: "34rem",
          background: "rgba(124,58,237,0.5)",
        }}
      />
      <div
        ref={glowBRef}
        className="ht-glow"
        style={{
          top: "6%",
          right: "-12%",
          width: "30rem",
          height: "30rem",
          background: "rgba(76,29,149,0.55)",
        }}
      />
      <div className="ht-grid" />
      <div className="ht-grain" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3">
          <span className="ht-label">
            <span className="ht-label__num">01</span> &nbsp;/&nbsp; Premium access
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-white/10" />
        </div>

        {/* Headline */}
        <h1 className="ht-display mt-6 text-[clamp(2.6rem,9vw,6.25rem)] text-white">
          <span className="ht-reveal-mask">
            <span className="ht-reveal-line">Premium tools</span>
          </span>
          <span className="ht-reveal-mask">
            <span className="ht-reveal-line">
              without the{" "}
              <span className="ht-display__accent">premium price</span>
            </span>
          </span>
        </h1>

        <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="hero-sub max-w-xl text-[15px] leading-relaxed text-[#9c92b8] sm:text-base">
              Canva Pro, ChatGPT Plus, Semrush and 100+ premium subscriptions —
              genuine private accounts, delivered within 24 hours, at up to 90%
              off list price.
            </p>

            <div className="hero-cta mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onJump?.("pricing")}
                className="ht-btn ht-btn--primary ht-btn__sweep px-7 py-4 text-[15px]"
                data-cursor-text="GET"
              >
                View plans
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </button>
              <button
                type="button"
                onClick={() => onJump?.("tools")}
                className="ht-btn ht-btn--ghost px-7 py-4 text-[15px]"
                data-cursor-text="EXPLORE"
              >
                <Play className="h-4 w-4 text-[#a78bfa]" />
                Explore the catalogue
              </button>
            </div>
          </div>

          {/* Floating tool tiles */}
          <HeroTiles />
        </div>

        {/* Stats rail */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.07] pt-8 sm:grid-cols-4 sm:gap-x-4">
          {STATS.map((s) => (
            <div key={s.label} className="hero-stat">
              <dt className="ht-label mt-2 block">{s.label}</dt>
              <dd className="order-first text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-white">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Brand marquee sits inside the hero so it shares the entrance timeline */}
      <div className="relative z-10 mt-14">
        <BrandMarquee />
      </div>
    </section>
  );
};

/* Six tool wordmarks floating in a staggered grid. Text-based on purpose —
   no third-party logo assets to load or get out of date. */
const TILE_TOOLS = [
  { short: "Cv", name: "Canva" },
  { short: "Gp", name: "ChatGPT" },
  { short: "Sr", name: "Semrush" },
  { short: "Ja", name: "Jasper" },
  { short: "Mz", name: "Moz" },
  { short: "Cc", name: "CapCut" },
];

const HeroTiles = () => (
  <div className="grid w-full max-w-[320px] grid-cols-3 gap-3 lg:w-[320px]">
    {TILE_TOOLS.map((t, i) => (
      <div key={t.name} className="hero-tile">
        <div
          className="ht-tile ht-float"
          style={{ animationDelay: `${(i % 3) * 0.9 + (i > 2 ? 0.45 : 0)}s` }}
          title={t.name}
        >
          <span className="text-lg font-bold text-white/85">{t.short}</span>
          <span className="ht-label mt-1 block text-[9px] tracking-[0.14em]">
            {t.name}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default HeroSection;
