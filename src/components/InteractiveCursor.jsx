import React, { useEffect, useRef, useState } from "react";

const InteractiveCursor = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const spotlightRef = useRef(null);

  // Position reference for spotlight interpolation
  const posRef = useRef({
    mouseX: -200,
    mouseY: -200,
    spotlightX: -200,
    spotlightY: -200,
  });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || isTouch || prefersReducedMotion) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const pos = posRef.current;
    let animId;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      pos.mouseX = e.clientX;
      pos.mouseY = e.clientY;

      if (pos.spotlightX < 0) {
        pos.spotlightX = e.clientX;
        pos.spotlightY = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Subtle ambient spotlight follow loop
    const loop = () => {
      pos.spotlightX += (pos.mouseX - pos.spotlightX) * 0.18;
      pos.spotlightY += (pos.mouseY - pos.spotlightY) * 0.18;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(280px circle at ${pos.spotlightX}px ${pos.spotlightY}px, rgba(108, 60, 230, 0.08), transparent 75%)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isSupported) return null;

  return (
    <div
      ref={spotlightRef}
      className="cursor-spotlight-layer"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden="true"
    />
  );
};

export default InteractiveCursor;
