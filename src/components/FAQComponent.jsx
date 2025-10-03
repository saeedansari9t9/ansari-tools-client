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
    <section id="faq" className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--color-light)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--color-dark)' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto" style={{ color: 'var(--color-mid-dark)' }}>
            Find answers to common questions about our premium tools and services
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {it.q}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === i ? (
                    <Minus className="w-6 h-6" strokeWidth={3} />
                  ) : (
                    <Plus className="w-6 h-6" strokeWidth={4} />
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
                <div className="px-8 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {it.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className=" text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-dark)' }}>
                Contact Support
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-200">
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
