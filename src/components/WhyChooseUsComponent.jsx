import React, { useRef } from "react";
import { DollarSign, ShieldCheck, Headphones, RefreshCcw, Zap, Shield } from "lucide-react";
import useCardGlow from "../hooks/useCardGlow";
import useScrollReveal from "../hooks/useScrollReveal";
import AnimatedCounter from "./AnimatedCounter";

const Item = ({ icon, title, desc, color, iconStyle }) => (
  <div className="why-item-reveal glow-card group bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-1">
    <div
      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md ${color}`}
      style={iconStyle}
    >
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2b0d66] transition-colors duration-200">
      {title}
    </h3>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
      {desc}
    </p>
  </div>
);

const WhyChooseUsComponent = () => {
  const containerRef = useRef(null);

  // Enable cursor glow & 3D tilt on feature cards
  useCardGlow(containerRef);

  // Staggered scroll reveal
  useScrollReveal({
    selector: ".why-item-reveal",
    stagger: 0.08,
    y: 30,
    duration: 0.75,
  });

  return (
    <section className="py-12 lg:py-20 relative overflow-hidden bg-[#faf8fc]/60">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className="inline-flex items-center gap-2 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md hover:scale-105 transition-transform cursor-default"
            style={{ backgroundColor: "var(--color-dark)" }}
          >
            <Shield className="w-3.5 h-3.5 animate-pulse" />
            Why Choose Us
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight text-gray-900"
          >
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b0d66] to-purple-600">
              AnsariTools
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover what makes us the preferred choice for premium digital tools
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16"
        >
          <Item
            color="text-white"
            iconStyle={{ backgroundColor: "var(--color-dark)" }}
            icon={<DollarSign className="w-6 h-6 text-white" />}
            title="Cost Savings"
            desc="Save up to 90% compared to individual subscriptions for each tool"
          />
          <Item
            color="text-white"
            iconStyle={{ backgroundColor: "var(--color-dark)" }}
            icon={<ShieldCheck className="w-6 h-6 text-white" />}
            title="100% Legal"
            desc="All accounts are legally purchased with proper licensing"
          />
          <Item
            color="text-white"
            iconStyle={{ backgroundColor: "var(--color-dark)" }}
            icon={<Headphones className="w-6 h-6 text-white" />}
            title="24/7 Support"
            desc="Get help anytime with our dedicated customer support team"
          />
          <Item
            color="text-white"
            iconStyle={{ backgroundColor: "var(--color-dark)" }}
            icon={<RefreshCcw className="w-6 h-6 text-white" />}
            title="Regular Updates"
            desc="We continuously add new tools to our collection"
          />
          <Item
            color="text-white"
            iconStyle={{ backgroundColor: "var(--color-dark)" }}
            icon={<Zap className="w-6 h-6 text-white" />}
            title="Reliable Access"
            desc="99.9% uptime guarantee for all tools and services"
          />
          <Item
            color="text-white"
            iconStyle={{ backgroundColor: "var(--color-dark)" }}
            icon={<Shield className="w-6 h-6 text-white" />}
            title="Privacy Focused"
            desc="Your data remains private and secure with our service"
          />
        </div>

        {/* Stats Counter with GSAP ScrollTrigger */}
        <div className="bg-white/90 backdrop-blur-md border border-purple-100 rounded-3xl p-8 sm:p-10 shadow-xl transition-all hover:shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="group pt-4 md:pt-0">
              <h3
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 group-hover:scale-105 transition-transform duration-300"
                style={{ color: "var(--color-dark)" }}
              >
                <AnimatedCounter value="10,000+" />
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-semibold">Happy Customers</p>
            </div>
            <div className="group pt-4 md:pt-0">
              <h3
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 group-hover:scale-105 transition-transform duration-300"
                style={{ color: "var(--color-dark)" }}
              >
                <AnimatedCounter value="50+" />
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-semibold">Premium Tools</p>
            </div>
            <div className="group pt-4 md:pt-0">
              <h3
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 group-hover:scale-105 transition-transform duration-300"
                style={{ color: "var(--color-dark)" }}
              >
                <AnimatedCounter value="99.9%" />
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-semibold">Customer Satisfaction</p>
            </div>
            <div className="group pt-4 md:pt-0">
              <h3
                className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 group-hover:scale-105 transition-transform duration-300"
                style={{ color: "var(--color-dark)" }}
              >
                <AnimatedCounter value="24/7" />
              </h3>
              <p className="text-gray-600 text-sm sm:text-base font-semibold">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsComponent;
