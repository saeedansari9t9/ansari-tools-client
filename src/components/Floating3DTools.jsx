import React, { useEffect, useRef, useState } from "react";
import canvaImg from "../assets/images/toolsimages/canva-icon.webp";
import chatgptImg from "../assets/images/toolsimages/ChatGPT_logo_Square.svg.png";
import semrushImg from "../assets/images/toolsimages/semrush.jpg";
import envatoImg from "../assets/images/toolsimages/envato.png";
import leonardoImg from "../assets/images/toolsimages/leonardo-ai-logo-png_seeklogo-619354.png";
import grammarlyImg from "../assets/images/toolsimages/grammerly.svg";

// Floating 3D Tool Boxes & LUMEN-style Web3 Space
const Floating3DTools = () => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 6 Premium 3D Tool Boxes (Canva, ChatGPT, Semrush, Leonardo, Envato, Grammarly)
  const tools = [
    {
      id: "canva",
      name: "Canva Pro",
      badge: "LIFETIME",
      logo: canvaImg,
      bgColor: "linear-gradient(135deg, #e0f7fa 0%, #ede7f6 50%, #ffffff 100%)",
      glowColor: "rgba(125, 42, 232, 0.45)",
      borderColor: "rgba(0, 196, 204, 0.65)",
      accentGlow: "#7d2ae8",
      size: 148, // px on desktop
      initialPos: { x: 38, y: 34 }, // percentage
      depth: 1.35,
      baseRot: { x: -8, y: 14, z: -3 },
      floatSpeed: 1.8,
      floatPhase: 0,
      zIndex: 30,
    },
    {
      id: "chatgpt",
      name: "ChatGPT Plus",
      badge: "GPT-4o",
      logo: chatgptImg,
      bgColor: "linear-gradient(135deg, #e6fcf5 0%, #f0fdf4 50%, #ffffff 100%)",
      glowColor: "rgba(16, 163, 127, 0.45)",
      borderColor: "rgba(16, 185, 129, 0.65)",
      accentGlow: "#10a37f",
      size: 124,
      initialPos: { x: 73, y: 8 },
      depth: 1.65,
      baseRot: { x: 10, y: -16, z: 4 },
      floatSpeed: 2.1,
      floatPhase: 1.5,
      zIndex: 25,
    },
    {
      id: "semrush",
      name: "Semrush Guru",
      badge: "SEO PRO",
      logo: semrushImg,
      bgColor: "linear-gradient(135deg, #fff7ed 0%, #fef2f2 50%, #ffffff 100%)",
      glowColor: "rgba(255, 100, 45, 0.42)",
      borderColor: "rgba(249, 115, 22, 0.65)",
      accentGlow: "#ff642d",
      size: 116,
      initialPos: { x: 3, y: 12 },
      depth: 1.1,
      baseRot: { x: -12, y: 18, z: -5 },
      floatSpeed: 1.6,
      floatPhase: 2.8,
      zIndex: 20,
    },
    {
      id: "leonardo",
      name: "Leonardo AI",
      badge: "AI 4K",
      logo: leonardoImg,
      bgColor: "linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #ffffff 100%)",
      glowColor: "rgba(168, 85, 247, 0.45)",
      borderColor: "rgba(217, 70, 239, 0.65)",
      accentGlow: "#c026d3",
      size: 120,
      initialPos: { x: 72, y: 64 },
      depth: 1.7,
      baseRot: { x: 12, y: -14, z: 6 },
      floatSpeed: 2.3,
      floatPhase: 4.1,
      zIndex: 26,
    },
    {
      id: "envato",
      name: "Envato Elements",
      badge: "UNLIMITED",
      logo: envatoImg,
      bgColor: "linear-gradient(135deg, #f7fee7 0%, #ecfccb 50%, #ffffff 100%)",
      glowColor: "rgba(130, 180, 64, 0.4)",
      borderColor: "rgba(132, 204, 22, 0.65)",
      accentGlow: "#84cc16",
      size: 110,
      initialPos: { x: 8, y: 65 },
      depth: 0.9,
      baseRot: { x: -6, y: 12, z: -2 },
      floatSpeed: 1.5,
      floatPhase: 5.2,
      zIndex: 18,
    },
    {
      id: "grammarly",
      name: "Grammarly",
      badge: "PREMIUM",
      logo: grammarlyImg,
      bgColor: "linear-gradient(135deg, #f0fdfa 0%, #f5f3ff 50%, #ffffff 100%)",
      glowColor: "rgba(21, 195, 154, 0.38)",
      borderColor: "rgba(20, 184, 166, 0.65)",
      accentGlow: "#14b8a6",
      size: 96,
      initialPos: { x: 44, y: 2 },
      depth: 0.65,
      baseRot: { x: 14, y: -8, z: 8 },
      floatSpeed: 1.4,
      floatPhase: 3.5,
      zIndex: 15,
    },
  ];

  // LUMEN-style Wireframe Cubes in background (Image 1 reference)
  const wireframes = [
    {
      id: "wf-1",
      initialPos: { x: 62, y: 30 },
      size: 140,
      depth: 0.6,
      rot: { x: 25, y: -35, z: 10 },
      color: "#8b5cf6",
      opacity: 0.4,
      floatSpeed: 1.2,
      floatPhase: 0.5,
    },
    {
      id: "wf-2",
      initialPos: { x: 16, y: 38 },
      size: 105,
      depth: 0.45,
      rot: { x: -20, y: 30, z: -15 },
      color: "#06b6d4",
      opacity: 0.35,
      floatSpeed: 1.4,
      floatPhase: 2.1,
    },
    {
      id: "wf-3",
      initialPos: { x: 82, y: 52 },
      size: 85,
      depth: 0.35,
      rot: { x: 15, y: 40, z: -5 },
      color: "#ec4899",
      opacity: 0.3,
      floatSpeed: 1.1,
      floatPhase: 4.0,
    },
  ];

  // Continuous physics interpolation
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  const boxNodesRef = useRef([]);
  const wireframeNodesRef = useRef([]);

  useEffect(() => {
    let animId;
    let startTime = performance.now();

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      mouseRef.current.targetX = Math.max(-1.4, Math.min(1.4, nx));
      mouseRef.current.targetY = Math.max(-1.4, Math.min(1.4, ny));
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // 60fps Physics & 3D Render Loop
    const loop = (currentTime) => {
      const elapsed = (currentTime - startTime) * 0.001;

      // Smooth lerp (0.072) for organic responsiveness
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.072;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.072;

      const mx = mouseRef.current.currentX;
      const my = mouseRef.current.currentY;

      // Update 3D tool boxes
      tools.forEach((t, i) => {
        const el = boxNodesRef.current[i];
        if (!el) return;

        // Continuous gentle bobbing
        const bob = Math.sin(elapsed * t.floatSpeed + t.floatPhase) * 8.5;
        const bobRot = Math.cos(elapsed * t.floatSpeed * 0.8 + t.floatPhase) * 2.2;

        // Parallax offset
        const parallaxX = mx * t.depth * 34;
        const parallaxY = my * t.depth * 30 + bob;

        // 3D Tilt calculation
        const rotX = t.baseRot.x + -my * t.depth * 18 + bobRot;
        const rotY = t.baseRot.y + mx * t.depth * 22;
        const rotZ = t.baseRot.z + mx * 4.5;

        // Lift on hover
        const isHovered = hoveredIndex === i;
        const liftZ = isHovered ? 45 : 0;
        const hoverScale = isHovered ? 1.12 : 1.0;

        el.style.transform = `translate3d(${parallaxX.toFixed(1)}px, ${parallaxY.toFixed(1)}px, ${liftZ}px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${hoverScale})`;
      });

      // Update background wireframe cubes
      wireframes.forEach((wf, i) => {
        const el = wireframeNodesRef.current[i];
        if (!el) return;

        const bob = Math.sin(elapsed * wf.floatSpeed + wf.floatPhase) * 6;
        const parallaxX = mx * wf.depth * 18;
        const parallaxY = my * wf.depth * 16 + bob;

        const rotX = wf.rot.x + -my * wf.depth * 10;
        const rotY = wf.rot.y + mx * wf.depth * 12 + elapsed * 5; // Slow rotation

        el.style.transform = `translate3d(${parallaxX.toFixed(1)}px, ${parallaxY.toFixed(1)}px, -30px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) rotateZ(${wf.rot.z}deg)`;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoveredIndex]);

  const handleBoxClick = (e) => {
    e.preventDefault();
    const target = document.getElementById("tools");
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -90, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] sm:h-[560px] lg:h-[600px] select-none pointer-events-auto flex items-center justify-center"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* LUMEN Cosmic Ambient Backlight Aura (Image 1 reference) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full filter blur-[100px] opacity-45 animate-pulse pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(108,60,230,0.65) 0%, rgba(43,13,102,0.3) 50%, transparent 70%)",
            animationDuration: "5s",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full filter blur-[90px] opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,196,204,0.55) 0%, transparent 70%)",
            top: "22%",
            left: "28%",
          }}
        />
      </div>

      {/* LUMEN-style Wireframe 3D Blocks (Image 1 reference) */}
      {wireframes.map((wf, idx) => (
        <div
          key={wf.id}
          ref={(node) => (wireframeNodesRef.current[idx] = node)}
          className="absolute pointer-events-none"
          style={{
            left: `${wf.initialPos.x}%`,
            top: `${wf.initialPos.y}%`,
            width: `${wf.size}px`,
            height: `${wf.size}px`,
            transformStyle: "preserve-3d",
            willChange: "transform",
            opacity: wf.opacity,
          }}
        >
          {/* Wireframe isometric SVG cube */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full filter drop-shadow-[0_0_12px_currentColor]"
            style={{ color: wf.color }}
          >
            {/* Top face */}
            <polygon
              points="50,15 85,35 50,55 15,35"
              fill="rgba(139, 92, 246, 0.08)"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Left face */}
            <polygon
              points="15,35 50,55 50,88 15,68"
              fill="rgba(43, 13, 102, 0.12)"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Right face */}
            <polygon
              points="50,55 85,35 85,68 50,88"
              fill="rgba(108, 60, 230, 0.15)"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}

      {/* 6 Interactive 3D Tool Cubes */}
      {tools.map((tool, idx) => {
        const isHovered = hoveredIndex === idx;

        return (
          <div
            key={tool.id}
            ref={(node) => (boxNodesRef.current[idx] = node)}
            className="absolute cursor-pointer transition-shadow duration-300"
            style={{
              left: `${tool.initialPos.x}%`,
              top: `${tool.initialPos.y}%`,
              width: `${tool.size}px`,
              height: `${tool.size}px`,
              zIndex: isHovered ? 50 : tool.zIndex,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={handleBoxClick}
            data-cursor-text={tool.name}
          >
            {/* Ambient Brand Glow beneath the block */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-50 transition-all duration-300 pointer-events-none filter blur-xl"
              style={{
                backgroundColor: tool.glowColor,
                opacity: isHovered ? 0.95 : 0.45,
                transform: "translateZ(-25px)",
              }}
            />

            {/* 3D Isometric / Beveled Cube Face (Canva & ChatGPT 3D Icon reference) */}
            <div
              className="relative w-full h-full rounded-[26px] sm:rounded-[32px] overflow-hidden p-3 sm:p-4 flex flex-col items-center justify-center transition-all duration-300"
              style={{
                background: tool.bgColor,
                boxShadow: isHovered
                  ? `0 28px 65px ${tool.glowColor}, 0 10px 20px rgba(0,0,0,0.12), 0 0 0 2px ${tool.borderColor}, inset 0 2px 5px rgba(255,255,255,1), inset 0 -4px 10px rgba(0,0,0,0.08)`
                  : `0 16px 42px rgba(43,13,102,0.18), 0 6px 12px rgba(0,0,0,0.06), 0 0 0 1.5px rgba(255,255,255,0.85), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -3px 8px rgba(0,0,0,0.05)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* 3D Wireframe / Neon Edge Highlight (LUMEN style) */}
              <div
                className="absolute inset-0 rounded-[26px] sm:rounded-[32px] pointer-events-none border transition-colors duration-300"
                style={{
                  borderColor: isHovered ? tool.borderColor : "rgba(255,255,255,0.65)",
                }}
              />

              {/* Specular 3D Gloss Sheen (like in Canva 3D icon images) */}
              <div
                className="absolute inset-0 rounded-[inherit] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.25) 38%, transparent 60%)",
                }}
              />

              {/* Tool Logo in 3D Relief */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center p-1 sm:p-2 transition-transform duration-300"
                style={{
                  transform: isHovered ? "translateZ(26px) scale(1.1)" : "translateZ(14px)",
                }}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] transition-transform duration-300 pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Floating Status Badge */}
              <div
                className="absolute bottom-1.5 sm:bottom-2 z-20 transition-all duration-300"
                style={{
                  transform: isHovered ? "translateZ(32px) scale(1.02)" : "translateZ(10px) scale(0.92)",
                  opacity: isHovered ? 1 : 0.88,
                }}
              >
                <span
                  className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full text-white uppercase tracking-wider shadow-sm flex items-center gap-1"
                  style={{
                    backgroundColor: "rgba(43, 13, 102, 0.88)",
                    backdropFilter: "blur(6px)",
                    border: `1px solid ${tool.borderColor}`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {tool.badge}
                </span>
              </div>
            </div>

            {/* Hover Tooltip Label */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 transition-all duration-300 pointer-events-none"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered
                  ? "translateX(-50%) translateY(0) translateZ(40px)"
                  : "translateX(-50%) translateY(-6px) translateZ(0)",
              }}
            >
              <div className="bg-[#2b0d66] text-white text-xs font-bold px-3 py-1 rounded-xl shadow-2xl border border-purple-300/40 flex items-center gap-1.5">
                <span>{tool.name}</span>
                <span className="text-[10px] text-purple-200">Explore &rarr;</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating 3D Micro Particle Stars in space (Image 1 reference) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "24%", y: "16%", size: 4, color: "#a855f7" },
          { x: "68%", y: "26%", size: 5, color: "#00c4cc" },
          { x: "88%", y: "42%", size: 3, color: "#10a37f" },
          { x: "12%", y: "52%", size: 4, color: "#ff642d" },
          { x: "50%", y: "76%", size: 5, color: "#ec4899" },
          { x: "32%", y: "88%", size: 3, color: "#38bdf8" },
        ].map((pt, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-ping opacity-35"
            style={{
              left: pt.x,
              top: pt.y,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              backgroundColor: pt.color,
              animationDuration: `${2.8 + i * 0.7}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Floating3DTools;
