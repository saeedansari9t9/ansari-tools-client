import React, { useEffect, useRef, useState } from "react";

const InteractiveCursor = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({
    mouseX: -100,
    mouseY: -100,
    ringX: -100,
    ringY: -100,
  });

  useEffect(() => {
    // Only enable on desktop pointer devices with fine tracking
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

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      pos.mouseX = e.clientX;
      pos.mouseY = e.clientY;

      if (pos.ringX < 0) {
        pos.ringX = e.clientX;
        pos.ringY = e.clientY;
      }

      // Check hovered elements for interactive state or custom cursor text
      const target = e.target.closest(
        "button, a, input, select, textarea, [data-cursor-text], .ht-card, .bento-card, .plan-card, .ht-btn, [role='button']"
      );

      if (target) {
        setIsHovered(true);
        const text = target.getAttribute("data-cursor-text");
        setCursorText(text || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // High performance RAF render loop for smooth spring lag
    const loop = () => {
      // 0.16 lerp creates that silky buttery magnetic trail
      pos.ringX += (pos.mouseX - pos.ringX) * 0.16;
      pos.ringY += (pos.mouseY - pos.ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.mouseX}px, ${pos.mouseY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.ringX}px, ${pos.ringY}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isSupported) return null;

  return (
    <div
      className={`custom-cursor-root pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#a78bfa] transition-transform duration-75 ${
          isHovered ? (cursorText ? "scale-0 opacity-0" : "scale-150 bg-white") : "scale-100"
        } ${isClicked ? "scale-75" : ""}`}
        style={{ willChange: "transform" }}
      />

      {/* Trailing Fluid Follower Aura */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          cursorText
            ? "-ml-9 -mt-9 h-18 px-4 border-[#a78bfa] bg-[#7c3aed]/85 text-white backdrop-blur-md shadow-[0_0_30px_rgba(124,58,237,0.7)]"
            : isHovered
            ? "-ml-6 -mt-6 h-12 w-12 border-[#a78bfa]/80 bg-[#7c3aed]/20 backdrop-blur-[2px] shadow-[0_0_20px_rgba(124,58,237,0.4)]"
            : "-ml-4 -mt-4 h-8 w-8 border-white/30 bg-white/[0.04]"
        } ${isClicked ? "scale-90" : "scale-100"}`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span className="whitespace-nowrap text-[10px] font-bold tracking-widest uppercase">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};

export default InteractiveCursor;
