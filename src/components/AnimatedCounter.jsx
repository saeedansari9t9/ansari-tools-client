import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AnimatedCounter = ({ value, className = "", duration = 1.8 }) => {
  const elRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    // Special cases:
    if (value === "24/7") {
      // Animate 24 smoothly
      const obj = { val: 0 };
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: 24,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayValue(`${Math.round(obj.val)}/7`);
            },
          });
        },
      });
      return () => trigger.kill();
    }

    // Parse value: e.g. "10,000+" -> num: 10000, suffix: "+", hasComma: true
    const isFloat = value.includes(".");
    const hasComma = value.includes(",");
    const isK = value.toLowerCase().includes("k");
    const rawNumberStr = value.replace(/[^0-9.]/g, "");
    const targetNum = parseFloat(rawNumberStr);

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    // Extract suffix
    const suffix = value.replace(/[0-9.,]/g, "");

    const obj = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: targetNum,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            let formatted;
            if (isFloat) {
              formatted = obj.val.toFixed(1);
            } else if (hasComma) {
              formatted = Math.round(obj.val).toLocaleString();
            } else {
              formatted = Math.round(obj.val).toString();
            }
            setDisplayValue(`${formatted}${suffix}`);
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, duration]);

  return (
    <span ref={elRef} className={className}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
