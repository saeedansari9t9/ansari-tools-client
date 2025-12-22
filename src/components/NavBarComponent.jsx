import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  ChevronDown,
  UserPlus,
  Shield,
  Lock,
  Home,
  Package,
  DollarSign,
  Wrench,
  Star,
  HelpCircle,
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { API } from "../services/api"; // axios instance

const NavBarComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [websiteDropdown, setWebsiteDropdown] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const profileRef = useRef(null);
  const websiteRef = useRef(null);
  const { isAuthenticated, user } = useAuth();

  // Check if current user is the main admin
  const isMainAdmin = user && user.email === "saeedansari9t9@gmail.com";

  const logout = async () => {
    try {
      await API.post("/admins/logout", {}, { withCredentials: true }); // withCredentials agar instance me set hai to yahan nahi chahiye
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }
  // Handle click outside to close the sidebar and prevent body scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

      // Close profile dropdown
      if (
        profileDropdown &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileDropdown(false);
      }

      // Close website dropdown
      if (
        websiteDropdown &&
        websiteRef.current &&
        !websiteRef.current.contains(event.target)
      ) {
        setWebsiteDropdown(false);
      }
    };

    // Prevent body scroll when sidebar is open
    if (open) {
      document.documentElement.classList.add("sidebar-open");
      document.body.classList.add("sidebar-open");
    } else {
      document.documentElement.classList.remove("sidebar-open");
      document.body.classList.remove("sidebar-open");
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.documentElement.classList.remove("sidebar-open");
      document.body.classList.remove("sidebar-open");
    };
  }, [open, profileDropdown, websiteDropdown]);

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b shadow-lg"
        style={{
          backgroundColor: "var(--color-dark)",
          borderColor: "var(--color-mid-light)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-3"
              onClick={() => setOpen(false)}
            >
              <img src={logo} alt="Ansari Tools" className="h-12 w-auto" />
              {/* <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
              ANSARI TOOLS
            </Link> */}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* For regular users - show all pages in center */}
              {!isAuthenticated && (
                <>
                  <NavLink
                    to="/"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/product"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/pricing"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    to="/tools"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Tools
                  </NavLink>
                  <NavLink
                    to="/testimonials"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Testimonials
                  </NavLink>
                  <NavLink
                    to="/faq"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    FAQ
                  </NavLink>
                </>
              )}

              {/* For admin users - show all website pages in center (same as regular users) */}
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/product"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/pricing"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    to="/tools"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Tools
                  </NavLink>
                  <NavLink
                    to="/testimonials"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    Testimonials
                  </NavLink>
                  <NavLink
                    to="/faq"
                    className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
                  >
                    FAQ
                  </NavLink>
                </>
              )}
            </nav>

            {/* Desktop Auth Buttons - Only show for authenticated admins */}
            {isAuthenticated && (
              <div className="hidden lg:flex items-center space-x-4">
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>
                      {user?.firstName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.email || "Profile"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        profileDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.firstName
                            ? `${user.firstName} ${user.lastName}`
                            : user?.email}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <p className="text-xs text-blue-600 font-medium">
                          Administrator
                        </p>
                      </div>

                      <div className="py-1">
                      <a
  href="https://dash.ansaritools.com/dashboard"
  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
  onClick={() => setProfileDropdown(false)}
>
  <LayoutDashboard className="w-4 h-4 mr-3" />
  Dashboard
</a>
                      <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <Shield className="w-4 h-4 mr-3" />
                          Admin Panel
                        </Link>
                        <Link
                          to="/admin/edit-profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Edit Profile
                        </Link>

                        <Link
                          to="/admin/change-password"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <Lock className="w-4 h-4 mr-3" />
                          Change Password
                        </Link>

                        {isMainAdmin && (
                          <Link
                            to="/admin/add-admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setProfileDropdown(false)}
                          >
                            <UserPlus className="w-4 h-4 mr-3" />
                            Make New Admin
                          </Link>
                        )}

                        <button
                          onClick={async () => {
                            setProfileDropdown(false);
                            await logout();
                            navigate("/");
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              ref={toggleRef}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-md" />
      )}
      <nav
        ref={navRef}
        className={`lg:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw] z-50 backdrop-blur-2xl transform transition-all duration-300 ease-in-out ${
          open
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible"
        }`}
        style={{ backgroundColor: "var(--color-dark)" }}
      >
        <div
          className="flex flex-col h-full backdrop-blur-2xl"
          style={{ backgroundColor: "var(--color-dark)" }}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center space-x-3">
              {/* <img 
                  src={logo} 
                  alt="Ansari Tools" 
                  className="h-8 w-auto"
                /> */}
              <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                ANSARI TOOLS
              </span>
            </div>
            <button
              className="p-2 rounded-lg text-white hover:bg-white/20"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Admin User Info - Show at top for authenticated users */}
          {isAuthenticated && (
            <div
              className="px-4 py-4 border-b border-white/20"
              style={{ backgroundColor: "var(--color-mid-dark)" }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to right, var(--color-mid-light), var(--color-light))",
                  }}
                >
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {user?.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.email}
                  </p>
                  <p className="text-xs text-blue-200">{user?.email}</p>
                  <p className="text-xs text-blue-300 font-medium">
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div
            className="flex-1 px-4 py-6 backdrop-blur-xl overflow-y-auto min-h-0"
            style={{ backgroundColor: "var(--color-dark)" }}
          >
            <ul className="space-y-2">
              {/* For Admin Users - Show admin pages at top, then website pages in dropdown */}
              {isAuthenticated && (
                <>
                  <li className="pt-2 pb-4 border-b border-white/20">
                    <p className="px-4 text-sm font-semibold text-blue-300 uppercase tracking-wider">
                      Admin Panel
                    </p>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/canva-subscriptions"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <Package className="w-5 h-5" />
                      <span>Canva Subscriptions</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/edit-profile"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <User className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/change-password"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <Lock className="w-5 h-5" />
                      <span>Change Password</span>
                    </Link>
                  </li>
                  {isMainAdmin && (
                    <li>
                      <Link
                        to="/admin/add-admin"
                        onClick={() => setOpen(false)}
                        className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                      >
                        <UserPlus className="w-5 h-5" />
                        <span>Make New Admin</span>
                      </Link>
                    </li>
                  )}
                  <li className="pt-4 pb-2 border-b border-white/20">
                    <p className="px-4 text-sm font-semibold text-blue-300 uppercase tracking-wider">
                      Website Pages
                    </p>
                  </li>

                  {/* Website Pages - Show in dropdown for admin */}
                  <li>
                    <div className="relative" ref={websiteRef}>
                      <button
                        onClick={() => setWebsiteDropdown(!websiteDropdown)}
                        className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <Wrench className="w-5 h-5" />
                          <span>Website Pages</span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            websiteDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {websiteDropdown && (
                        <div className="mt-2 ml-4 space-y-1">
                          <NavLink
                            to="/"
                            onClick={() => {
                              setOpen(false);
                              setWebsiteDropdown(false);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                          >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                          </NavLink>
                          <NavLink
                            to="/product"
                            onClick={() => {
                              setOpen(false);
                              setWebsiteDropdown(false);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                          >
                            <Package className="w-4 h-4" />
                            <span>Products</span>
                          </NavLink>
                          <NavLink
                            to="/pricing"
                            onClick={() => {
                              setOpen(false);
                              setWebsiteDropdown(false);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                          >
                            <DollarSign className="w-4 h-4" />
                            <span>Pricing</span>
                          </NavLink>
                          <NavLink
                            to="/tools"
                            onClick={() => {
                              setOpen(false);
                              setWebsiteDropdown(false);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                          >
                            <Wrench className="w-4 h-4" />
                            <span>Tools</span>
                          </NavLink>
                          <NavLink
                            to="/testimonials"
                            onClick={() => {
                              setOpen(false);
                              setWebsiteDropdown(false);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                          >
                            <Star className="w-4 h-4" />
                            <span>Testimonials</span>
                          </NavLink>
                          <NavLink
                            to="/faq"
                            onClick={() => {
                              setOpen(false);
                              setWebsiteDropdown(false);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                          >
                            <HelpCircle className="w-4 h-4" />
                            <span>FAQ</span>
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </li>
                </>
              )}

              {/* For Regular Users - Show all pages as list items */}
              {!isAuthenticated && (
                <>
                  <li>
                    <NavLink
                      to="/"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <Home className="w-5 h-5" />
                      <span>Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/product"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <Package className="w-5 h-5" />
                      <span>Products</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/pricing"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <DollarSign className="w-5 h-5" />
                      <span>Pricing</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/tools"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <Wrench className="w-5 h-5" />
                      <span>Tools</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/testimonials"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <Star className="w-5 h-5" />
                      <span>Testimonials</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/faq"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                    >
                      <HelpCircle className="w-5 h-5" />
                      <span>FAQ</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Logout Button - Only show for authenticated admins */}
              {isAuthenticated && (
                <li>
                  <button
                    onClick={async () => {
                      setOpen(false);
                      await logout();
                      navigate("/");
                    }}
                    className="w-full flex items-center space-x-2 px-6 py-3 text-red-300 rounded-lg font-medium hover:bg-red-500/20 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;
