import React from 'react';
import logo from '../assets/images/logo.png';
import { Package, BarChart3, Sparkles, ShieldCheck } from 'lucide-react';

const AdminAuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white text-slate-900 font-sans">
      {/* ── LEFT PANEL: Brand & Website Control Showcase ── */}
      <div className="relative w-full lg:w-[48%] bg-gradient-to-br from-[#19073b] via-[#2b0d66] to-[#43148f] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden select-none">
        {/* Ambient background glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Top: Logo & System Title */}
        <div className="relative z-10 flex items-center gap-3">
          <img src={logo} alt="Ansari Tools" className="h-10 w-auto object-contain" />
          <div>
            <div className="font-extrabold text-lg tracking-tight leading-tight">Ansari Tools</div>
            <div className="text-[11px] font-bold text-purple-200 uppercase tracking-widest">
              Website Admin Portal
            </div>
          </div>
        </div>

        {/* Middle: Value & Features of Website Administration */}
        <div className="relative z-10 my-10 lg:my-0 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-purple-100 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Central Administration Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Manage Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-indigo-200">
                Website Platform
              </span>
            </h1>
            <p className="text-purple-200/80 text-sm sm:text-base mt-4 max-w-md leading-relaxed">
              Authorized access to configure tools, process Canva subscriptions, track store sales, and manage platform administrators.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3.5 max-w-md">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-200 shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Product & Tools Catalog</div>
                <div className="text-xs text-purple-200/70">Create, update and manage live tool listings</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-200 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Canva Subscriptions</div>
                <div className="text-xs text-purple-200/70">Assign and monitor active subscriber seats</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-200 shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Sales & Revenue Reports</div>
                <div className="text-xs text-purple-200/70">Track orders, daily revenue, and expense logs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Security Notice */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-purple-200/70 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Restricted to authorized system administrators only</span>
        </div>
      </div>

      {/* ── RIGHT PANEL: Auth Form Card ── */}
      <div className="w-full lg:w-[52%] bg-slate-50 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_1px_3px_rgba(0,0,0,0.03)] border border-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminAuthLayout;
