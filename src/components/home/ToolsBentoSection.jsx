import React, { useState } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Palette,
  Search,
  Video,
  PenTool,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useReveal, useCardSheen } from "./useHomeMotion";
import { SectionHead } from "./PricingSection";

const WHATSAPP = "923227866655";

const CATEGORIES = [
  { id: "all", label: "All Arsenal", icon: Zap },
  { id: "ai", label: "AI & Innovation", icon: Sparkles },
  { id: "design", label: "Design & Video", icon: Palette },
  { id: "seo", label: "SEO & Growth", icon: Search },
  { id: "writing", label: "Writing & Content", icon: PenTool },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingBag },
];

const TOOLS_DATA = [
  {
    id: "canva-pro",
    name: "Canva Pro",
    tagline: "Unlimited Brand Kits, AI Magic Studio, 100M+ Stock Assets",
    category: "design",
    badge: "Bestseller",
    badgeType: "hot",
    featured: true,
    colSpan: "lg:col-span-2",
    accent: "from-[#8b5cf6]/30 to-[#6d28d9]/10",
    iconColor: "text-purple-400",
    tags: ["Brand Kit", "100M+ Stock", "Background Remover", "Magic Write"],
    savings: "Save 88%",
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    tagline: "GPT-4o, Advanced Data Analysis, DALL·E 3, Custom GPTs",
    category: "ai",
    badge: "Top Demand",
    badgeType: "ai",
    featured: true,
    colSpan: "lg:col-span-1",
    accent: "from-emerald-500/20 to-emerald-900/10",
    iconColor: "text-emerald-400",
    tags: ["GPT-4o Access", "DALL-E 3", "Code Interpreter", "Browse Mode"],
    savings: "Private Account",
  },
  {
    id: "semrush-pro",
    name: "Semrush Guru / Pro",
    tagline: "Industry-standard keyword tracking, competitor audits, and backlink research",
    category: "seo",
    badge: "SEO Titan",
    colSpan: "lg:col-span-1",
    accent: "from-orange-500/20 to-orange-950/10",
    iconColor: "text-orange-400",
    tags: ["Domain Overview", "Keyword Magic", "Site Audit", "Rank Tracker"],
    savings: "Save 92%",
  },
  {
    id: "capcut-motion",
    name: "CapCut Pro & Motion Array",
    tagline: "4K auto-captions, professional transitions, LUTs, and unlimited after-effects stock",
    category: "design",
    badge: "Creator Kit",
    colSpan: "lg:col-span-2",
    accent: "from-cyan-500/20 to-blue-950/10",
    iconColor: "text-cyan-400",
    tags: ["Auto Captions", "4K Export", "Royalty-free Audio", "Motion Presets"],
    savings: "Full Access",
  },
  {
    id: "quillbot-grammarly",
    name: "Quillbot Premium & Grammarly",
    tagline: "Paraphrase in 9 modes with unlimited words plus deep tone and plagiarism checks",
    category: "writing",
    badge: "Academic & Pro",
    colSpan: "lg:col-span-1",
    accent: "from-amber-500/20 to-amber-950/10",
    iconColor: "text-amber-400",
    tags: ["Unlimited Paraphrase", "Grammar Engine", "Tone Adjustment", "Plagiarism"],
    savings: "Instant 24h",
  },
  {
    id: "envato-elements",
    name: "Envato Elements",
    tagline: "Unlimited downloads of WordPress themes, 3D assets, fonts, video templates, & graphics",
    category: "design",
    badge: "Unlimited Vault",
    colSpan: "lg:col-span-1",
    accent: "from-emerald-400/20 to-teal-950/10",
    iconColor: "text-teal-400",
    tags: ["Themes & Plugins", "Stock Footage", "3D Renderings", "Commercial License"],
    savings: "Save 85%",
  },
  {
    id: "perplexity-jasper",
    name: "Perplexity Pro & Jasper AI",
    tagline: "Deep research with live citations, Claude 3.5 Sonnet queries, and automated sales copy",
    category: "ai",
    badge: "Deep Research",
    colSpan: "lg:col-span-1",
    accent: "from-indigo-500/20 to-purple-950/10",
    iconColor: "text-indigo-400",
    tags: ["Web Citations", "Claude 3.5", "Marketing Copy", "File Analysis"],
    savings: "Private Key",
  },
  {
    id: "helium10-jungle",
    name: "Helium 10 & Jungle Scout",
    tagline: "High-accuracy Amazon FBA product research, Black Box filter, and Xray chrome extensions",
    category: "ecommerce",
    badge: "Amazon FBA",
    colSpan: "lg:col-span-1",
    accent: "from-blue-500/20 to-indigo-950/10",
    iconColor: "text-blue-400",
    tags: ["Black Box", "Xray Extension", "Profit Calculator", "Keyword Tracker"],
    savings: "Full Features",
  },
];

const askToolOnWhatsApp = (toolName) => {
  const msg = `Hello! I would like to get access to ${toolName}. Please send me the subscription price and instant activation details.`;
  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener,noreferrer"
  );
};

const ToolsBentoSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const revealRef = useReveal({ selector: ".bento-card", stagger: 0.08, y: 35 });
  const sheenRef = useCardSheen();

  const filteredTools =
    activeCategory === "all"
      ? TOOLS_DATA
      : TOOLS_DATA.filter((t) => t.category === activeCategory);

  return (
    <section id="tools" className="ht-section relative overflow-hidden py-20 sm:py-28">
      {/* Ambient background bloom */}
      <div
        className="ht-glow"
        style={{
          top: "15%",
          right: "-10%",
          width: "36rem",
          height: "36rem",
          background: "rgba(124,58,237,0.18)",
        }}
      />
      <div
        className="ht-glow"
        style={{
          bottom: "10%",
          left: "-10%",
          width: "32rem",
          height: "32rem",
          background: "rgba(76,29,149,0.22)",
        }}
      />
      <div className="ht-grid" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          index="03"
          kicker="Catalogue"
          title="The complete tools suite"
          copy="Every account is verified, private, and monitored 24/7. Switch between categories to browse individual tools or get them bundled in our plans."
        />

        {/* Category Pill Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-start gap-2.5 sm:justify-center">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#7c3aed] text-white shadow-[0_0_24px_rgba(124,58,237,0.6)]"
                    : "border border-white/10 bg-white/[0.03] text-[#9c92b8] hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-[#a78bfa]"
                  }`}
                />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Layout */}
        <div
          ref={revealRef}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div ref={sheenRef} className="contents">
            {filteredTools.map((tool) => (
              <article
                key={tool.id}
                className={`bento-card ht-card group flex flex-col justify-between overflow-hidden p-6 sm:p-7 ${
                  tool.colSpan || "lg:col-span-1"
                }`}
              >
                <div className="ht-card__sheen" />

                {/* Subtle top-corner gradient sheen */}
                <div
                  className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-gradient-to-bl ${tool.accent} opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3">
                    <span className="ht-label inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-[#c4b5fd]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa] animate-pulse" />
                      {tool.badge}
                    </span>
                    <span className="ht-label text-[11px] font-medium text-emerald-400">
                      {tool.savings}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-white group-hover:text-[#c4b5fd] transition-colors duration-300">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#9c92b8]">
                    {tool.tagline}
                  </p>

                  {/* Feature Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[12px] text-white/70"
                      >
                        <CheckCircle2 className="h-3 w-3 text-[#a78bfa]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-8 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="ht-label text-[11px] text-[#6b6184]">
                      Private & Guaranteed
                    </span>
                    <button
                      type="button"
                      onClick={() => askToolOnWhatsApp(tool.name)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#a78bfa] transition-all duration-300 hover:text-white group-hover:translate-x-1"
                    >
                      <span>Inquire Now</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#170e2b] via-[#10091e] to-[#170e2b] p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <h4 className="text-base font-bold text-white">
              Need a custom tool not listed here?
            </h4>
            <p className="mt-1 text-[13px] text-[#9c92b8]">
              We source and activate 50+ enterprise subscriptions upon special request.
            </p>
          </div>
          <button
            type="button"
            onClick={() => askToolOnWhatsApp("Custom Tool Request")}
            className="ht-btn ht-btn--ghost mt-4 px-5 py-2.5 text-[13px] sm:mt-0"
          >
            <span>Request Tool on WhatsApp</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#a78bfa]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToolsBentoSection;
