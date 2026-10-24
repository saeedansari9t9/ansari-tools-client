import React from "react";
import {
  ShieldCheck,
  Zap,
  BadgePercent,
  Headphones,
  RotateCcw,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { useReveal, useCardSheen } from "./useHomeMotion";
import { SectionHead } from "./PricingSection";

const ADVANTAGES = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "100% Private Accounts",
    desc: "No kicked-out sessions or shared passwords with strangers. You receive dedicated credentials that remain active throughout your billing cycle.",
    badge: "Security First",
  },
  {
    num: "02",
    icon: Zap,
    title: "Instant 24h Activation",
    desc: "Your access is delivered directly via WhatsApp or email with straightforward login instructions within 24 hours (often under 2 hours).",
    badge: "Rapid Delivery",
  },
  {
    num: "03",
    icon: BadgePercent,
    title: "Up to 90% Cost Reduction",
    desc: "Buying Semrush, Canva, and ChatGPT separately costs over $450/month. Ansari Tools bundles everything starting from just PKR 1,199.",
    badge: "Smart Savings",
  },
  {
    num: "04",
    icon: Headphones,
    title: "Human WhatsApp Support",
    desc: "No automated ticket queues. Message our team directly on WhatsApp (+92 322 7866655) and receive quick solutions from real specialists.",
    badge: "VIP Assistance",
  },
  {
    num: "05",
    icon: RotateCcw,
    title: "7-Day Money-Back Guarantee",
    desc: "Zero financial risk. If any tool fails to meet the promised specifications within the first week, we issue a prompt, no-fuss refund.",
    badge: "Risk-Free",
  },
  {
    num: "06",
    icon: Lock,
    title: "99.9% Uptime & Replacement",
    desc: "If any software updates or provider policies disrupt your access, our monitoring system replaces your credentials immediately.",
    badge: "Guaranteed Uptime",
  },
];

const WhyChooseUsSection = () => {
  const revealRef = useReveal({ selector: ".adv-card", stagger: 0.09, y: 36 });
  const sheenRef = useCardSheen();

  return (
    <section className="ht-section relative overflow-hidden py-20 sm:py-28">
      {/* Background radial glow */}
      <div
        className="ht-glow"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "44rem",
          height: "28rem",
          background: "rgba(124,58,237,0.18)",
        }}
      />
      <div className="ht-grid" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          index="04"
          kicker="Advantage"
          title="Engineered for reliability"
          copy="We solve the standard frustrations of digital tool access — downtime, credential conflicts, and unresponsive vendors."
        />

        {/* Advantage Cards Grid */}
        <div
          ref={revealRef}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div ref={sheenRef} className="contents">
            {ADVANTAGES.map((adv) => {
              const Icon = adv.icon;
              return (
                <article
                  key={adv.num}
                  className="adv-card ht-card group flex flex-col justify-between overflow-hidden p-7 sm:p-8"
                >
                  <div className="ht-card__sheen" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#a78bfa] shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#7c3aed]/20 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="ht-label text-[11px] text-[#6b6184]">
                        {adv.num}
                      </span>
                    </div>

                    <div className="mt-6">
                      <span className="ht-label text-[10px] text-[#c4b5fd]">
                        {adv.badge}
                      </span>
                      <h3 className="mt-1 text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#c4b5fd]">
                        {adv.title}
                      </h3>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-[#9c92b8]">
                        {adv.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 h-px bg-white/[0.07]" />
                </article>
              );
            })}
          </div>
        </div>

        {/* Live Reliability Metric Bar */}
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:grid-cols-4 sm:p-8">
          <div className="text-center sm:text-left">
            <span className="ht-label block text-[10px]">Average Response</span>
            <span className="mt-1 block text-2xl font-black text-white">
              &lt; 15 mins
            </span>
          </div>
          <div className="text-center sm:text-left">
            <span className="ht-label block text-[10px]">Customer Satisfaction</span>
            <span className="mt-1 block text-2xl font-black text-[#a78bfa]">
              99.4%
            </span>
          </div>
          <div className="text-center sm:text-left">
            <span className="ht-label block text-[10px]">Verified Accounts</span>
            <span className="mt-1 block text-2xl font-black text-white">
              10,000+
            </span>
          </div>
          <div className="text-center sm:text-left">
            <span className="ht-label block text-[10px]">Money-Back Policy</span>
            <span className="mt-1 block text-2xl font-black text-emerald-400">
              7 Days Risk-Free
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
