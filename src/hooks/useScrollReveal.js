import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable scroll reveal hook using GSAP ScrollTrigger
 * @param {Object} options
 * @param {string} options.selector - CSS selector for elements within container to reveal
 * @param {number} options.stagger - Stagger delay between items (default 0.08)
 * @param {number} options.y - Initial translateY distance (default 35)
 * @param {number} options.duration - Duration in seconds (default 0.75)
 * @param {string} options.start - ScrollTrigger start position (default "top 85%")
 */
export function useScrollReveal({
  selector = ".reveal-item",
  stagger = 0.08,
  y = 35,
  duration = 0.75,
  start = "top 85%",
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const items = container.querySelectorAll(selector);
    if (!items || items.length === 0) return;

    // Set initial hidden state
    gsap.set(items, {
      opacity: 0,
      y: y,
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: start,
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: duration,
          stagger: stagger,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [selector, stagger, y, duration, start]);

  return containerRef;
}

export default useScrollReveal;
