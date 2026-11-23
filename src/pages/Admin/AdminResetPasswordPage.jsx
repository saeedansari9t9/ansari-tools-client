import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import AdminAuthLayout from '../../components/AdminAuthLayout';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../services/api';

const PASSWORD_RULES = [
  {
    id: 'length',
    label: '12 to 128 characters',
    test: (pw) => pw.length >= 12 && pw.length <= 128,
  },
  {
    id: 'case',
    label: 'Uppercase and lowercase letters (A-Z, a-z)',
    test: (pw) => /[a-z]/.test(pw) && /[A-Z]/.test(pw),
  },
  {
    id: 'number',
    label: 'At least one number (0-9)',
    test: (pw) => /\d/.test(pw),
  },
  {
    id: 'special',
    label: 'At least one special character (!@#$...)',
    test: (pw) => /[^A-Za-z0-9]/.test(pw),
  },
];

const AdminResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const token = (searchParams.get('token') || '').trim();

  const [tokenState, setTokenState] = useState(token ? 'verifying' : 'invalid'); // verifying | valid | invalid | success
  const [tokenError, setTokenError] = useState(
    token ? '' : 'Password reset link is missing or malformed.'
  );

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const errorBannerRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    const verifyToken = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admins/reset-password/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (cancelled) return;

        if (res.ok && data.valid) {
          setTokenState('valid');
        } else {
          setTokenError(
            data.message || 'This password reset link is invalid or has expired.'
          );
          setTokenState('invalid');
        }
      } catch (err) {
        console.error('Token verify error:', err);
        if (!cancelled) {
          setTokenError('Unable to verify reset link due to a network error.');
          setTokenState('invalid');
        }
      }
    };

    verifyToken();
    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (tokenState !== 'success') return;
    const timer = setTimeout(() => {
      navigate('/admin/login', { replace: true });
    }, 2200);
    return () => clearTimeout(timer);
  }, [tokenState, navigate]);

  const validateForm = () => {
    const nextErrors = {};

    const failingRule = PASSWORD_RULES.find((rule) => !rule.test(newPassword));
    if (!newPassword) {
      nextErrors.newPassword = 'New password is required';
    } else if (failingRule) {
      nextErrors.newPassword = 'Password does not meet all security requirements below';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your new password';
    } else if (confirmPassword !== newPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/admins/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        logout();
        toast.success('Password reset successfully! Redirecting to login...');
        setTokenState('success');
      } else if (
        response.status === 400 &&
        data.message?.toLowerCase().includes('invalid or has expired')
      ) {
        setTokenError(data.message);
        setTokenState('invalid');
      } else {
        setErrors({
          general: data.message || 'Unable to reset password. Please try again.',
        });
        requestAnimationFrame(() => errorBannerRef.current?.focus());
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setErrors({
        general: 'Network error. Please check your connection and try again.',
      });
      requestAnimationFrame(() => errorBannerRef.current?.focus());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminAuthLayout>
      {tokenState === 'verifying' && (
        <div className="py-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#2b0d66] mx-auto">
            <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Verifying Reset Link</h2>
            <p className="text-sm text-slate-500 mt-1">
              Please wait while we validate your security token...
            </p>
          </div>
        </div>
      )}

      {tokenState === 'invalid' && (
        <div className="space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Link Invalid or Expired
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {tokenError || 'This password reset link is no longer valid. Reset links expire after 15 minutes or once used.'}
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <Link
              to="/admin/forgot-password"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#2b0d66] hover:bg-[#381085] shadow-lg shadow-purple-950/15 transition-all flex items-center justify-center gap-2"
            >
              <span>Request New Reset Link</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/admin/login"
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin Login</span>
            </Link>
          </div>
        </div>
      )}

      {tokenState === 'success' && (
        <div className="space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Password Updated!
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Your admin password has been changed and previous sessions have been secured. Redirecting you to the login page...
            </p>
          </div>

          <Link
            to="/admin/login"
            replace
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#2b0d66] hover:bg-[#381085] shadow-lg shadow-purple-950/15 transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {tokenState === 'valid' && (
        <>
          <div className="mb-7">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2b0d66] bg-purple-50 border border-purple-200/70 px-2.5 py-1 rounded-full mb-3">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Create New Password</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reset Admin Password
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Choose a strong new password for your administrator account.
            </p>
          </div>

          {errors.general && (
            <div
              ref={errorBannerRef}
              role="alert"
              tabIndex={-1}
              className="mb-6 rounded-2xl bg-rose-50 border border-rose-200/80 p-3.5 text-xs font-semibold text-rose-700 outline-none"
            >
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* New Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="new-password"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) {
                      setErrors((prev) => ({ ...prev, newPassword: '' }));
                    }
                  }}
                  autoComplete="new-password"
                  placeholder="Enter strong new password"
                  aria-invalid={Boolean(errors.newPassword)}
                  className={`w-full px-4 py-3.5 pr-20 rounded-xl border ${
                    errors.newPassword
                      ? 'border-rose-400 bg-rose-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  } bg-white text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:border-[#2b0d66] focus:ring-4 focus:ring-purple-600/10`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {showNewPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.newPassword && (
                <p role="alert" className="text-rose-500 text-xs font-medium pl-1 mt-1">
                  {errors.newPassword}
                </p>
              )}

              {/* Live Password Requirements */}
              <div className="mt-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-3 space-y-1.5">
                {PASSWORD_RULES.map((rule) => {
                  const passed = rule.test(newPassword);
                  return (
                    <div
                      key={rule.id}
                      className={`flex items-center gap-2 text-xs transition-colors ${
                        passed ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          passed
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-200/80 text-slate-400'
                        }`}
                      >
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{rule.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirm-password"
                className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) {
                      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                    }
                  }}
                  autoComplete="new-password"
                  placeholder="Re-enter new password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  className={`w-full px-4 py-3.5 pr-20 rounded-xl border ${
                    errors.confirmPassword
                      ? 'border-rose-400 bg-rose-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  } bg-white text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:border-[#2b0d66] focus:ring-4 focus:ring-purple-600/10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <p role="alert" className="text-rose-500 text-xs font-medium pl-1 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
              {!errors.confirmPassword &&
                confirmPassword.length > 0 &&
                confirmPassword === newPassword && (
                  <p className="text-emerald-600 text-xs font-semibold pl-1 mt-1">
                    Passwords match
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#2b0d66] hover:bg-[#381085] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-950/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                to="/admin/login"
                className="text-xs font-semibold text-slate-500 hover:text-[#2b0d66] transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Admin Login</span>
              </Link>
            </div>

            <div className="pt-2 text-center">
              <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                256-bit Encrypted Password Reset
              </span>
            </div>
          </form>
        </>
      )}
    </AdminAuthLayout>
  );
};

export default AdminResetPasswordPage;
