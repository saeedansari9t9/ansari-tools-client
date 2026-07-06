import React from "react";

export default function CustomLoader() {
  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-slate-50/80 backdrop-blur-sm select-none z-[9999]">
      <style>{`
        .custom-loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .custom-loader-wrap svg {
          width: 120px;
          height: 120px;
          overflow: visible;
        }
        .custom-loader-wrap .stripe {
          fill: none;
          stroke: #6a5cff;
          stroke-width: 6;
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: draw-stripe 2.4s ease-in-out infinite;
          filter: drop-shadow(0 0 3px rgba(106, 92, 255, 0.15));
        }
        .custom-loader-wrap .stripe.t {
          stroke: url(#tGrad);
        }
        /* stagger each stripe */
        .custom-loader-wrap .s1 { animation-delay: 0s; }
        .custom-loader-wrap .s2 { animation-delay: .08s; }
        .custom-loader-wrap .s3 { animation-delay: .16s; }
        .custom-loader-wrap .s4 { animation-delay: .24s; }
        .custom-loader-wrap .s5 { animation-delay: .32s; }
        .custom-loader-wrap .t1 { animation-delay: .1s; }
        .custom-loader-wrap .t2 { animation-delay: .18s; }
        .custom-loader-wrap .t3 { animation-delay: .26s; }

        @keyframes draw-stripe {
          0% { stroke-dashoffset: 1; opacity: 0; }
          15% { opacity: 1; }
          45% { stroke-dashoffset: 0; opacity: 1; }
          70% { stroke-dashoffset: 0; opacity: 1; }
          90% { stroke-dashoffset: -1; opacity: 0; }
          100% { stroke-dashoffset: -1; opacity: 0; }
        }
      `}</style>

      <div className="custom-loader-wrap animate-fade-in">
        <svg viewBox="0 0 226 200">
          <defs>
            <linearGradient id="tGrad" gradientUnits="userSpaceOnUse" x1="108" y1="0" x2="200" y2="0">
              <stop offset="0%" stopColor="#6a5cff" />
              <stop offset="100%" stopColor="#c84fff" />
            </linearGradient>
          </defs>

          {/* T: top bar, 3 parallel horizontal stripes (drawn first = behind) */}
          <path className="stripe t t1" d="M110 44 L196 44" pathLength={1} />
          <path className="stripe t t2" d="M110 56 L196 56" pathLength={1} />
          <path className="stripe t t3" d="M110 68 L196 68" pathLength={1} />

          {/* T: legs, 4 vertical stripes hanging from bar */}
          <path className="stripe t t1" d="M132 68 L132 168" pathLength={1} />
          <path className="stripe t t2" d="M144 68 L144 168" pathLength={1} />
          <path className="stripe t t3" d="M156 68 L156 168" pathLength={1} />
          <path className="stripe t t1" d="M168 68 L168 168" pathLength={1} />

          {/* A: 4 nested chevrons (V-shapes), each translated right (drawn after = in front) */}
          <path className="stripe s1" d="M24 168 L70 44 L116 168" pathLength={1} />
          <path className="stripe s2" d="M34 168 L80 44 L126 168" pathLength={1} />
          <path className="stripe s3" d="M44 168 L90 44 L136 168" pathLength={1} />
          <path className="stripe s4" d="M54 168 L100 44 L146 168" pathLength={1} />

          {/* A: crossbar, two short stripes on the leftmost chevron */}
          <path className="stripe s3" d="M46 116 L94 116" pathLength={1} />
          <path className="stripe s4" d="M42 131 L98 131" pathLength={1} />
        </svg>
      </div>
    </div>
  );
}
