import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroComponent from "../components/HeroComponent";
import PricingComponent from "../components/PricingComponent";
import ToolsCategoriesComponent from "../components/ToolsCategoriesComponent";
import WhyChooseUsComponent from "../components/WhyChooseUsComponent";
import CTAComponent from "../components/CTAComponent";
import TestimonialsComponent from "../components/TestimonialsComponent";
import FAQComponent from "../components/FAQComponent";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [location]);

  return (
    <>
      <HeroComponent />
      <div id="pricing">
        <PricingComponent />
      </div>
      <div id="tools">
        <ToolsCategoriesComponent />
      </div>
      <WhyChooseUsComponent />
      <div id="reviews">
        <TestimonialsComponent />
      </div>
      <div id="faq">
        <FAQComponent />
      </div>
    </>
  );
};

export default HomePage;
