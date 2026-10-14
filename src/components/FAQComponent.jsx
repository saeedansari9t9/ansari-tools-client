import React, { useState } from "react";
import { Plus, HelpCircle, MessageSquare } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((p) => (p === i ? null : i));

  // Staggered reveal for FAQ items
  useScrollReveal({
    selector: ".faq-item-reveal",
    stagger: 0.08,
    y: 25,
    duration: 0.7,
  });

  const items = [
    {
      q: "How do I get started?",
      a: "Getting started is easy! Simply choose a subscription plan that fits your needs, complete the payment process, and you'll receive access to your tools within 24 hours via email.",
    },
    {
      q: "How long does it take to get access?",
      a: "After your payment is confirmed, you'll receive access to your tools within 24 hours. In most cases, we deliver access much faster, often within just a few hours.",
    },
    {
      q: "Are these shared accounts?",
      a: "No, you'll receive private accounts for each tool. These are not shared with other users, ensuring you have full access to all features without interruption.",
    },
    {
      q: "What happens if a tool stops working?",
      a: "Our team monitors all accounts 24/7. If any tool experiences issues, we'll replace it within 24 hours. Simply contact our support team, and we'll resolve it promptly.",
    },
    {
      q: "Can I cancel my subscription?",
      a: "Yes, you can cancel your subscription at any time. However, we do not offer refunds for partial subscription periods. Your access will continue until the end of your billing cycle.",
    },
    {
      q: "Is there a money-back guarantee?",
      a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with our service. Contact our support team within 7 days of your purchase for a full refund.",
    },
  ];

  const handleContactSupport = () => {
    const phoneNumber = "+923227866655";
    const message = "Hello! I have a question regarding Ansari Tools subscriptions. Can you please assist me?";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="faq" className="py-12 lg:py-20 relative overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div
            className="inline-flex items-center gap-2 text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md hover:scale-105 transition-transform cursor-default"
            style={{ backgroundColor: "var(--color-dark)" }}
          >
            <HelpCircle className="w-4 h-4 animate-pulse" />
            FAQ
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight text-gray-900"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our premium tools and services
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3.5">
          {items.map((it, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="faq-item-reveal bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <button
                  className="w-full px-5 sm:px-7 py-5 sm:py-6 text-left flex items-center justify-between hover:bg-purple-50/40 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <h3
                    className={`text-base sm:text-lg font-bold pr-4 transition-colors duration-200 ${
                      isOpen ? "text-[#2b0d66]" : "text-gray-900"
                    }`}
                  >
                    {it.q}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#2b0d66] text-white rotate-45"
                        : "bg-purple-50 text-[#2b0d66] rotate-0"
                    }`}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                  </div>
                </button>

                {/* Smooth Grid Accordion */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-50"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                        transition: "opacity 0.28s ease, transform 0.28s ease",
                      }}
                    >
                      {it.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-purple-50/50 backdrop-blur-sm border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Still Have Questions?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <button
                onClick={handleContactSupport}
                className="btn-shimmer-effect text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--color-dark)" }}
                data-cursor-text="CHAT"
              >
                <MessageSquare className="w-4 h-4" />
                Contact Support
              </button>
              <button
                onClick={handleContactSupport}
                className="border-2 border-purple-200 text-[#2b0d66] bg-white hover:bg-purple-50 px-6 py-3 rounded-xl font-bold transition-all duration-200 text-sm cursor-pointer hover:-translate-y-0.5"
              >
                Ask via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
