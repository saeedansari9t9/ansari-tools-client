import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Staggered fade-up reveal for a section. Returns a ref for the container.
 * Elements matching `selector` start hidden and animate in on scroll.
 */
export function useReveal({
  selector = ".ht-fade-up",
  y = 34,
  stagger = 0.09,
  duration = 0.9,
  start = "top 82%",
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll(selector);
    if (!items.length) return;

    // With reduced motion we leave the DOM in its natural visible state.
    if (reduced()) return;

    gsap.set(items, { opacity: 0, y });

    const st = ScrollTrigger.create({
      trigger: root,
      start,
      once: true,
      onEnter: () =>
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          clearProps: "transform",
        }),
    });

    return () => st.kill();
  }, [selector, y, stagger, duration, start]);

  return ref;
}

/**
 * Tracks the pointer inside `.ht-card` children and exposes its position as
 * --mx/--my custom properties, which drives the radial sheen in CSS.
 * Pointer-only: skipped on touch devices where there is no hover state.
 */
export function useCardSheen() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || reduced()) return;

    const cards = Array.from(root.querySelectorAll(".ht-card"));
    if (!cards.length) return;

    const cleanups = cards.map((card) => {
      let frame = null;

      const onMove = (e) => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = null;
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      };

      card.addEventListener("pointermove", onMove, { passive: true });

      return () => {
        card.removeEventListener("pointermove", onMove);
        if (frame) cancelAnimationFrame(frame);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return ref;
}

export { reduced as prefersReducedMotion };
