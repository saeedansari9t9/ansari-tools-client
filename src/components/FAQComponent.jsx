import React, { useState } from "react";
import { Minus, Plus, HelpCircle } from "lucide-react";

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((p) => (p === i ? null : i));

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

  return (
    <section id="faq" className="py-8 sm:py-12 lg:py-16" style={{ backgroundColor: 'var(--color-light)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium mb-3 sm:mb-4 shadow-lg" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
            <HelpCircle className="w-3 h-3" />
            FAQ
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--color-dark)' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto" style={{ color: 'var(--color-mid-dark)' }}>
            Find answers to common questions about our premium tools and services
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {items.map((it, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 pr-3">
                  {it.q}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === i ? (
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={4} />
                  )}
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === i 
                    ? "max-h-96 opacity-100" 
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {it.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-4 sm:p-6 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Still Have Questions?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-sm" style={{ backgroundColor: 'var(--color-dark)' }}>
                Contact Support
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-200 text-sm">
                View All FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
