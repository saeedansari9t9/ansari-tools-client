import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import PricingSection from "../components/home/PricingSection";
import ToolsBentoSection from "../components/home/ToolsBentoSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import ScrollProgressBar from "../components/home/ScrollProgressBar";
import OfferPopup from "../components/OfferPopup";
import { useTheme } from "../context/ThemeContext";
import "../styles/home-dark.css";

const HomePage = () => {
  const location = useLocation();
  const { isDark } = useTheme();

  const handleJump = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.1 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        handleJump(id);
      }, 300);
    }
  }, [location]);

  return (
    <div
      className={`${
        isDark ? "home-dark bg-[#0a0612]" : "home-light bg-[#f8f6fc]"
      } relative w-full overflow-hidden transition-colors duration-500`}
    >
      {/* Luminous Dynamic Scroll Progress Tracker at very top */}
      <ScrollProgressBar />

      {/* Special Offer Promotional Modal */}
      <OfferPopup />

      {/* Hero Section with staggered entrance, floating wordmark tiles, and stats rail */}
      <HeroSection onJump={handleJump} />

      {/* Section Divider */}
      <div className="ht-rule" />

      {/* Pricing Section with Student, Agency, and Blogging packages */}
      <PricingSection />

      {/* Section Divider */}
      <div className="ht-rule" />

      {/* Tools Bento Grid with interactive category filter */}
      <ToolsBentoSection />

      {/* Section Divider */}
      <div className="ht-rule" />

      {/* Why Choose Us: 6 Core Value Propositions */}
      <WhyChooseUsSection />

      {/* Section Divider */}
      <div className="ht-rule" />

      {/* Customer Testimonials & Verified Reviews */}
      <TestimonialsSection />

      {/* Section Divider */}
      <div className="ht-rule" />

      {/* Frequently Asked Questions Accordion */}
      <FAQSection />

      {/* Section Divider */}
      <div className="ht-rule" />

      {/* High-Impact WhatsApp VIP Conversion CTA */}
      <CTASection onJump={handleJump} />
    </div>
  );
};

export default HomePage;
