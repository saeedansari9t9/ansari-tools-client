import React from "react";
import { ArrowUpRight, Phone, ShieldCheck, Zap, Lock, Sparkles } from "lucide-react";
import { useReveal } from "./useHomeMotion";

const WHATSAPP = "923227866655";

const CTASection = ({ onJump }) => {
  const revealRef = useReveal({ selector: ".cta-reveal", stagger: 0.1, y: 30 });

  const startWhatsApp = () => {
    const msg = "Hello Ansari Tools! I would like to subscribe to your digital tools. Please guide me with current offers and instant activation.";
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="ht-section relative overflow-hidden py-24 sm:py-32">
      {/* Background glow layers */}
      <div
        className="ht-glow"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50rem",
          height: "30rem",
          background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(76,29,149,0.15) 60%, transparent 100%)",
        }}
      />
      <div className="ht-grid" />

      <div
        ref={revealRef}
        className="relative z-10 mx-auto w-full max-w-[1100px] px-5 sm:px-8"
      >
        <div className="cta-reveal relative overflow-hidden rounded-3xl border border-[#a78bfa]/30 bg-gradient-to-b from-[#1c1133] via-[#120a22] to-[#0d071a] p-8 shadow-[0_20px_80px_rgba(124,58,237,0.3)] sm:p-14 lg:p-16">
          {/* Decorative background grid inside card */}
          <div className="absolute inset-0 bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

          <div className="relative z-10 text-center">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[12px] font-semibold text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Official WhatsApp Support Online Now
            </div>

            {/* Display Heading */}
            <h2 className="ht-display mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4rem)] text-white">
              Unlock the entire digital software arsenal today.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#9c92b8] sm:text-base">
              Join 10,000+ creators, agencies, and freelancers saving thousands of dollars every month with verified, private subscriptions.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={startWhatsApp}
                className="ht-btn ht-btn--primary ht-btn__sweep w-full px-8 py-4 text-[15px] sm:w-auto"
                data-cursor-text="CHAT"
              >
                <Phone className="h-4 w-4" />
                <span>Chat on WhatsApp (0322 7866655)</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onJump?.("pricing")}
                className="ht-btn ht-btn--ghost w-full px-8 py-4 text-[15px] sm:w-auto"
                data-cursor-text="PLANS"
              >
                <span>Browse All Plans</span>
              </button>
            </div>

            {/* Guarantees row */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/[0.08] pt-8 text-[12.5px] text-[#9c92b8]">
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#a78bfa]" />
                24-Hour Instant Delivery
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                7-Day Money-Back Guarantee
              </span>
              <span className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#a78bfa]" />
                100% Private Credentials
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
