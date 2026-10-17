import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SmoothScroll = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef(null);
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    // If on admin panel, destroy Lenis so native mouse wheel & touchpad scroll work smoothly
    if (isAdmin) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        window.__lenis = null;
      }
      return;
    }

    // Respect user reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with refined easing for public website
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, [isAdmin]);

  // Handle route change & hash navigation
  useEffect(() => {
    if (isAdmin) return;

    if (location.hash) {
      const id = location.hash.substring(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [isAdmin, location.pathname, location.hash]);

  return <>{children}</>;
};

export default SmoothScroll;
