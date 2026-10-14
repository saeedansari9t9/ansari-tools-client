import React, { useRef, useEffect } from "react";

const MagneticButton = ({ children, className = "", strength = 0.28, ...props }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isFinePointer || isTouch) return;

    let rafId;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;

      // Clamp movement to 10px maximum
      const clampedX = Math.max(-10, Math.min(10, x));
      const clampedY = Math.max(-10, Math.min(10, y));

      el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
      el.style.transition = "transform 0.1s ease-out";
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate3d(0px, 0px, 0px)";
      el.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return (
    <div ref={btnRef} className={`inline-block ${className}`} {...props}>
      {children}
    </div>
  );
};

export default MagneticButton;
