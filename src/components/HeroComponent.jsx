import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Zap, Crown } from "lucide-react";
import gsap from "gsap";
import AnimatedCounter from "./AnimatedCounter";
import MagneticButton from "./MagneticButton";
import Floating3DTools from "./Floating3DTools";

const HeroComponent = () => {
  const heroSectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const statsRef = useRef(null);
  const visualCardRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  // Cinematic Entrance Sequence
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          [headingLine1Ref.current, headingLine2Ref.current],
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          visualCardRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
    }, heroSectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Subtle Background Blob Parallax on Desktop
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isTouch || prefersReducedMotion) return;

    const hero = heroSectionRef.current;
    if (!hero) return;

    let rafId;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${nx * 14}px, ${ny * 14}px, 0)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${nx * -16}px, ${ny * -16}px, 0)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${nx * 10}px, ${ny * 10}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      if (blob1Ref.current) blob1Ref.current.style.transform = "translate3d(0, 0, 0)";
      if (blob2Ref.current) blob2Ref.current.style.transform = "translate3d(0, 0, 0)";
      if (blob3Ref.current) blob3Ref.current.style.transform = "translate3d(0, 0, 0)";
    };

    hero.addEventListener("mousemove", handleMouseMove, { passive: true });
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -90, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Modern Mesh Gradient / Blobs Background */}
      <div className="absolute inset-0 w-full h-full bg-[#fcfaff] z-0 overflow-hidden pointer-events-none">
        <div
          ref={blob1Ref}
          className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob transition-transform duration-700 ease-out"
        />
        <div
          ref={blob2Ref}
          className="absolute top-[20%] right-[-5%] w-[35rem] h-[35rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 transition-transform duration-700 ease-out"
        />
        <div
          ref={blob3Ref}
          className="absolute bottom-[-20%] left-[20%] w-[25rem] h-[25rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000 transition-transform duration-700 ease-out"
        />

        {/* Grid overlay for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Bottom fade to blend with the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-8 w-full">
        {/* Left Column: Text */}
        <div className="w-full lg:w-[50%] text-center lg:text-left">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 sm:mb-5 bg-white text-[#2b0d66] border border-purple-200 shadow-sm mx-auto lg:mx-0 transition-all hover:border-purple-300 hover:shadow-md cursor-default"
          >
            <Crown className="w-4 h-4 text-purple-600 animate-pulse" />
            Premium AI Tools Subscription
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-4 sm:mb-5 tracking-tight">
            <span className="mask-reveal-wrapper block">
              <span ref={headingLine1Ref} className="mask-reveal-line block">
                Unlock{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b0d66] via-purple-600 to-purple-400">
                  Premium Tools
                </span>
              </span>
            </span>
            <span className="mask-reveal-wrapper block mt-1 sm:mt-1.5">
              <span ref={headingLine2Ref} className="mask-reveal-line block">
                Without The Premium Price
              </span>
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-7 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            Get instant access to Canva Pro, Semrush, ChatGPT Plus, and 100+ premium digital tools at up to 90% discount. Built for creators, agencies, and students.
          </p>

          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 sm:mb-9"
          >
            <MagneticButton strength={0.25}>
              <a
                href="#pricing"
                onClick={(e) => handleScrollTo(e, "pricing")}
                className="btn-shimmer-effect px-8 py-4 rounded-xl font-bold text-white shadow-[0_8px_30px_rgb(43,13,102,0.25)] hover:shadow-[0_12px_36px_rgb(43,13,102,0.45)] hover:-translate-y-0.5 transition-all duration-300 bg-[#2b0d66] flex items-center justify-center gap-2 cursor-pointer"
                data-cursor-text="GET"
              >
                <Sparkles className="w-5 h-5 text-purple-300" />
                Get Started Now
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href="#tools"
                onClick={(e) => handleScrollTo(e, "tools")}
                className="px-8 py-4 rounded-xl font-bold text-[#2b0d66] bg-white hover:bg-purple-50/80 border border-purple-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                data-cursor-text="EXPLORE"
              >
                <Zap className="w-5 h-5 text-purple-600" />
                Explore Tools
              </a>
            </MagneticButton>
          </div>

          <div
            ref={statsRef}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6 border-t border-gray-200/60 pt-6 sm:pt-7"
          >
            <div className="group">
              <h4 className="text-3xl font-black text-gray-900 group-hover:text-[#2b0d66] transition-colors">
                <AnimatedCounter value="50+" />
              </h4>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Premium Tools</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="group">
              <h4 className="text-3xl font-black text-gray-900 group-hover:text-[#2b0d66] transition-colors">
                <AnimatedCounter value="10k+" />
              </h4>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Happy Users</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-200" />
            <div className="group">
              <h4 className="text-3xl font-black text-gray-900 group-hover:text-[#2b0d66] transition-colors">
                <AnimatedCounter value="24/7" />
              </h4>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Instant Support</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Floating Interactive Tool Cubes (Canva, ChatGPT, Semrush, etc.) */}
        <div
          ref={visualCardRef}
          className="w-full lg:w-[50%] relative flex items-center justify-center mt-8 lg:mt-0"
        >
          <Floating3DTools />
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
