import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, MailCheck, Send, ShieldCheck, RefreshCw } from 'lucide-react';
import AdminAuthLayout from '../../components/AdminAuthLayout';
import { API_BASE_URL } from '../../services/api';

const AdminForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const errorBannerRef = useRef(null);

  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateEmail(email);
    if (validationError) {
      setFieldError(validationError);
      return;
    }

    setFieldError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admins/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast.success('Reset instructions sent! Check your email inbox.');
      } else {
        setError(data.message || 'Unable to process password reset request');
        requestAnimationFrame(() => errorBannerRef.current?.focus());
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Network error. Please check your connection and try again.');
      requestAnimationFrame(() => errorBannerRef.current?.focus());
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthLayout>
      {submitted ? (
        <div className="space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <MailCheck className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Check Your Email
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              If an active admin account exists for{' '}
              <span className="font-semibold text-slate-800 break-all">{email.trim()}</span>, we&apos;ve sent a password reset link.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-xs text-slate-600 space-y-1.5 leading-relaxed">
            <p>
              • Click the <strong className="text-slate-800">Reset Password</strong> button in the email to set a new password.
            </p>
            <p>• The link stays valid for 15 minutes and can only be used once.</p>
            <p>• Can&apos;t find it? Check your Spam or Junk folder.</p>
          </div>

          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setError('');
              }}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Send to a different email or resend</span>
            </button>

            <Link
              to="/admin/login"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#2b0d66] hover:bg-[#381085] shadow-lg shadow-purple-950/15 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin Login</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#2b0d66] transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Login</span>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Forgot Password?
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Enter your registered administrator email address and we&apos;ll send you a secure link to reset your password.
            </p>
          </div>

          {error && (
            <div
              ref={errorBannerRef}
              role="alert"
              tabIndex={-1}
              className="mb-6 rounded-2xl bg-rose-50 border border-rose-200/80 p-3.5 text-xs font-semibold text-rose-700 outline-none"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="forgot-email"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
              >
                Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldError) setFieldError('');
                  if (error) setError('');
                }}
                onBlur={() => {
                  if (email.trim()) {
                    setFieldError(validateEmail(email));
                  }
                }}
                autoComplete="email"
                placeholder="admin@ansaritools.com"
                aria-invalid={Boolean(fieldError)}
                className={`w-full px-4 py-3.5 rounded-xl border ${
                  fieldError
                    ? 'border-rose-400 bg-rose-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                } bg-white text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:border-[#2b0d66] focus:ring-4 focus:ring-purple-600/10`}
              />
              {fieldError && (
                <p role="alert" className="text-rose-500 text-xs font-medium pl-1 mt-1">
                  {fieldError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#2b0d66] hover:bg-[#381085] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-950/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>

            <div className="pt-4 text-center">
              <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secure One-Time Reset Link via Email
              </span>
            </div>
          </form>
        </>
      )}
    </AdminAuthLayout>
  );
};

export default AdminForgotPasswordPage;
