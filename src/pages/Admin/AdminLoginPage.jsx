import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../services/api';
import AdminAuthLayout from '../../components/AdminAuthLayout';
import { ShieldCheck, ArrowRight } from 'lucide-react';

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
    <AdminAuthLayout>
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
            <div role="alert" className="mb-6 rounded-2xl bg-rose-50 border border-rose-200/80 p-3.5 text-xs font-semibold text-rose-700">
              {errors.general}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="admin-login-email" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                id="admin-login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="admin@ansaritools.com"
                aria-invalid={Boolean(errors.email)}
                className={`w-full px-4 py-3.5 rounded-xl border ${
                  errors.email
                    ? 'border-rose-400 bg-rose-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                } bg-white text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:border-[#2b0d66] focus:ring-4 focus:ring-purple-600/10`}
              />
              {errors.email && (
                <p role="alert" className="text-rose-500 text-xs font-medium pl-1 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="admin-login-password" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-semibold text-[#2b0d66] hover:text-[#43148f] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b0d66]/40 rounded px-1 py-0.5 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="admin-login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  aria-invalid={Boolean(errors.password)}
                  className={`w-full px-4 py-3.5 pr-20 rounded-xl border ${
                    errors.password
                      ? 'border-rose-400 bg-rose-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  } bg-white text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:border-[#2b0d66] focus:ring-4 focus:ring-purple-600/10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p role="alert" className="text-rose-500 text-xs font-medium pl-1 mt-1">{errors.password}</p>
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
    </AdminAuthLayout>
  );
};

export default AdminLoginPage;
