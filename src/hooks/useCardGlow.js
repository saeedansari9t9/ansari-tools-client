import { useEffect, useRef } from "react";

/**
 * Hook to apply cursor-following glow and subtle 3D tilt to cards on desktop devices.
 * Can be attached to a single card ref or a container ref holding multiple `.glow-card` elements.
 */
export function useCardGlow(containerRef = null) {
  const localRef = useRef(null);
  const ref = containerRef || localRef;

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isTouch || prefersReducedMotion) return;

    const rootEl = ref.current;
    if (!rootEl) return;

    // Determine target cards: either the root element itself if it has .glow-card, or child .glow-card elements
    const cards = rootEl.classList.contains("glow-card")
      ? [rootEl]
      : Array.from(rootEl.querySelectorAll(".glow-card"));

    if (cards.length === 0) return;

    const cleanupFns = [];

    cards.forEach((card) => {
      let isHovered = false;

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for radial glow and border illumination
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        // Calculate subtle 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = -((y - centerY) / centerY) * 3.5; // Max 3.5 deg
        const tiltY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
        card.style.transition = "transform 0.08s ease-out, box-shadow 0.25s ease";
      };

      const handleMouseEnter = () => {
        isHovered = true;
      };

      const handleMouseLeave = () => {
        isHovered = false;
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease";
      };

      card.addEventListener("mousemove", handleMouseMove, { passive: true });
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      cleanupFns.push(() => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [ref]);

  return ref;
}

export default useCardGlow;
