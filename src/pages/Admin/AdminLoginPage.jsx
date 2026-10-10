import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../services/api';
import logo from '../../assets/images/logo.png';
import { Package, BarChart3, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admins/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        login(data.admin);
        toast.success('Admin authentication verified!');
        navigate('/admin');
      } else {
        if (data.message === 'Invalid email or password') {
          setErrors({
            email: 'Invalid administrator email or password',
            password: 'Invalid administrator email or password'
          });
        } else {
          setErrors({
            general: data.message || 'Authentication failed'
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: 'Network error. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white text-slate-900 select-none font-sans">
      {/* ── LEFT PANEL: Brand & Website Control Showcase ── */}
      <div className="relative w-full lg:w-[48%] bg-gradient-to-br from-[#19073b] via-[#2b0d66] to-[#43148f] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
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

      {/* ── RIGHT PANEL: Clean & Crisp Admin Login Form ── */}
      <div className="w-full lg:w-[52%] bg-slate-50 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_1px_3px_rgba(0,0,0,0.03)] border border-slate-100">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Login
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Sign in with your master credentials to enter the control panel.
            </p>
          </div>

          {/* Error Banner */}
          {errors.general && (
            <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200/80 p-3.5 text-xs font-semibold text-rose-700">
              {errors.general}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="admin@ansaritools.com"
                className={`w-full px-4 py-3.5 rounded-xl border ${
                  errors.email
                    ? 'border-rose-400 bg-rose-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                } bg-white text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:border-[#2b0d66] focus:ring-4 focus:ring-purple-600/10`}
              />
              {errors.email && (
                <p className="text-rose-500 text-xs font-medium pl-1 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className={`w-full px-4 py-3.5 pr-20 rounded-xl border ${
                    errors.password
                      ? 'border-rose-400 bg-rose-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  } bg-white text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:border-[#2b0d66] focus:ring-4 focus:ring-purple-600/10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-500 text-xs font-medium pl-1 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#2b0d66] hover:bg-[#381085] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-950/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Footer Trust Badge */}
            <div className="pt-4 text-center">
              <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                256-bit Encrypted Admin Session
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
