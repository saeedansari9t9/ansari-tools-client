import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, ArrowUpRight } from "lucide-react";
import { useReveal } from "./useHomeMotion";
import { SectionHead } from "./PricingSection";

const WHATSAPP = "923227866655";

const FAQS = [
  {
    q: "How do I get started and receive my accounts?",
    a: "Getting started takes less than 2 minutes. Choose your desired plan or tool, click the order button which opens our official WhatsApp chat (+92 322 7866655). Once payment is confirmed, your credentials and clear setup instructions are delivered within 24 hours (usually under 2 hours).",
  },
  {
    q: "Are these accounts private or shared with strangers?",
    a: "You receive genuine private accounts with your own dedicated credentials for key tools. We do NOT run overcrowded shared sessions where users kick each other out or delete each other's work.",
  },
  {
    q: "What payment methods do you accept?",
    a: "For Pakistani clients, we accept JazzCash, EasyPaisa, Nayapay, SadaPay, and direct Bank Transfer (Raast). For overseas clients, we accept Binance / USDT, Wise, and International Bank Wire.",
  },
  {
    q: "What happens if a tool experiences issues or updates?",
    a: "Our system monitors account validity 24/7. In the rare event of a platform password reset or vendor update, simply text our WhatsApp helpline and our support team will resolve or replace your access immediately.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes! We provide an unconditional 7-Day Money-Back Guarantee. If the delivered tools do not function as promised or do not meet your technical expectations, you will receive a full refund with zero hassle.",
  },
  {
    q: "Can I customize a custom bundle with only specific tools?",
    a: "Absolutely. If none of our preset packages (Student, Agency, Blogging) match your exact stack, message us on WhatsApp and we will quote you a personalized bundle with custom discount pricing.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const revealRef = useReveal({ selector: ".faq-row", stagger: 0.07, y: 25 });

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  const openWhatsApp = () => {
    const msg = "Hello! I have a question regarding Ansari Tools subscriptions. Can you please assist me?";
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="faq" className="ht-section relative overflow-hidden py-20 sm:py-28">
      {/* Background radial glow */}
      <div
        className="ht-glow"
        style={{
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "42rem",
          height: "26rem",
          background: "rgba(124,58,237,0.18)",
        }}
      />
      <div className="ht-grid" />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-5 sm:px-8">
        <SectionHead
          index="06"
          kicker="FAQ"
          title="Frequently asked questions"
          copy="Clear answers regarding billing, account privacy, activation timelines, and guarantee policies."
          align="center"
        />

        {/* FAQ Accordion List */}
        <div ref={revealRef} className="mt-14 space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`faq-row rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#a78bfa]/35 bg-[#170e28] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="text-[16px] font-bold text-white sm:text-[17px]">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 border-[#a78bfa] bg-[#7c3aed] text-white"
                        : "border-white/10 bg-white/5 text-[#9c92b8]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[14px] leading-relaxed text-[#c4b5fd]/90">
                    <p className="border-t border-white/[0.07] pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout Box */}
        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/20 text-[#a78bfa]">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-white">
                Have a question that isn't answered here?
              </h4>
              <p className="text-[13px] text-[#9c92b8]">
                Our support team is online 24/7 on WhatsApp to help you immediately.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openWhatsApp}
            className="ht-btn ht-btn--primary ht-btn__sweep mt-4 px-6 py-3 text-[13px] sm:mt-0"
          >
            <span>Ask on WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
