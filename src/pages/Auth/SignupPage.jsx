import React, { useState } from "react";
import { Eye, EyeOff, Facebook, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../services/api";
import logo from "../../assets/images/logo.png";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPwd, setShowPwd] = useState({ pwd: false, confirm: false });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setError(""); // Clear error when form changes
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!form.terms) {
      setError("Please accept Terms & Privacy Policy");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      
      // Use auth context login function
      login(data.token);
      
      // Show success toast message
      toast.success("Signup successfully! Welcome to Ansari Tools!");
      
      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src={logo} 
                alt="AnsariTools Logo" 
                className="h-12 w-auto"
              />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ANSARI TOOLS
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Get access to premium tools at unbeatable prices</p>
          </div>

          {/* Signup Form */}
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  required
                  value={form.firstName}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  required
                  value={form.lastName}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPwd.pwd ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  value={form.password}
                  onChange={onChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label={showPwd.pwd ? "Hide password" : "Show password"}
                  onClick={() => setShowPwd((p) => ({ ...p, pwd: !p.pwd }))}
                >
                  {showPwd.pwd ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showPwd.confirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  value={form.confirmPassword}
                  onChange={onChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label={showPwd.confirm ? "Hide password" : "Show password"}
                  onClick={() => setShowPwd((p) => ({ ...p, confirm: !p.confirm }))}
                >
                  {showPwd.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={onChange}
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4">
            <button
              className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all duration-200"
              aria-label="Sign up with Google"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width="25"
                height="25"
                alt="Google"
              />
            </button>
            <button
              className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all duration-200"
              aria-label="Sign up with Facebook"
            >
              <img
                src="https://www.svgrepo.com/show/343553/facebook-network-communication-internet-interaction.svg"
                width="30"
                height="30"
                alt="Facebook"
              />
            </button>
            <button
              className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all duration-200"
              aria-label="Sign up with Twitter"
            >
              <img
                src="https://www.svgrepo.com/show/475689/twitter-color.svg"
                width="26"
                height="26"
                alt="Twitter"
              />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
