import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Menu, X, User, LogOut, ChevronDown,
  UserPlus, Shield, Lock, LayoutDashboard,
  Search, ShoppingBag, Phone, ChevronRight,
  Star, Tag, Wrench, HelpCircle, Home, Package,
  Sun, Moon, Sparkles, Zap
} from "lucide-react";
import logo from "../assets/images/ansari-tools-logo-purple.png";
import { logoutAll } from "../services/logout";
import { useProducts } from "../hooks/useProducts";
import { useTheme } from "../context/ThemeContext";

const NavBarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const mobileNavRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const profileRef = useRef(null);

  const { isAuthenticated, user } = useAuth();
  const isMainAdmin = user && user.email === "saeedansari9t9@gmail.com";
  
  const { theme, toggleTheme, isDark } = useTheme();
  const { products } = useProducts();
  
  const filteredProducts = searchQuery.trim() 
    ? products?.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) || []
    : [];

  const logout = async () => {
    await logoutAll();
    window.location.href = "/login";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (mobileOpen && mobileNavRef.current && !mobileNavRef.current.contains(e.target) && mobileToggleRef.current && !mobileToggleRef.current.contains(e.target)) setMobileOpen(false);
      if (profileOpen && profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen, profileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.classList.add("sidebar-open");
      document.body.classList.add("sidebar-open");
    } else {
      document.documentElement.classList.remove("sidebar-open");
      document.body.classList.remove("sidebar-open");
    }
    return () => {
      document.documentElement.classList.remove("sidebar-open");
      document.body.classList.remove("sidebar-open");
    };
  }, [mobileOpen]);

  if (location.pathname.startsWith("/admin")) return null;

  const navLinks = [
    { label: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { label: "Products", path: "/product", icon: <Package className="w-4 h-4" /> },
    { label: "Pricing", path: "/#pricing", icon: <Tag className="w-4 h-4" /> },
    { label: "Tools", path: "/#tools", icon: <Wrench className="w-4 h-4" /> },
    { label: "Reviews", path: "/#reviews", icon: <Star className="w-4 h-4" /> },
    { label: "About Us", path: "/about", icon: <HelpCircle className="w-4 h-4" /> },
    { label: "FAQ", path: "/#faq", icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleNavClick = (e, path) => {
    if (path.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = path.substring(2);
      const el = document.getElementById(id);
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.history.pushState(null, "", path);
      }
    }
  };

  return (
    <>
      <header className={`ec-header ${scrolled ? "ec-header--scrolled" : ""}`}>
        {/* ── REDESIGNED UNIFIED HIGH-TECH TOP UTILITY BAR ── */}
        <div className="ec-topbar border-b border-white/[0.08] transition-colors duration-300">
          <div className="ec-topbar__inner flex items-center justify-between py-2 px-4 sm:px-6 max-w-7xl mx-auto text-xs">
            {/* Left: Operational status & WhatsApp hotline */}
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                24/7 Live Delivery
              </span>

              <a
                href="https://wa.me/923227866655?text=Hello%20Ansari%20Tools%2C%20I%20am%20contacting%20you%20through%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: <strong className="text-white font-bold">0322 7866655</strong></span>
              </a>
            </div>

            {/* Center: Live Promotion Ticker */}
            <div className="hidden lg:flex items-center gap-2 text-white/70">
              <span className="inline-flex items-center gap-1 rounded bg-[#7c3aed]/25 border border-[#a78bfa]/30 px-2 py-0.5 text-[10px] font-bold text-[#c4b5fd]">
                <Sparkles className="w-3 h-3 text-[#a78bfa]" />
                EXCLUSIVE
              </span>
              <span className="text-[12px]">Save up to 90% on Semrush, Canva Pro & ChatGPT Plus • Genuine Private Accounts</span>
            </div>

            {/* Right: Quick Anchors + Theme Toggle + User */}
            <div className="flex items-center gap-3 sm:gap-4">
              <nav className="hidden md:flex items-center gap-3 text-white/75">
                <a href="/#pricing" onClick={(e) => handleNavClick(e, "/#pricing")} className="hover:text-white transition-colors">Pricing</a>
                <span className="opacity-30">/</span>
                <a href="/#tools" onClick={(e) => handleNavClick(e, "/#tools")} className="hover:text-white transition-colors">Tools</a>
                <span className="opacity-30">/</span>
                <a href="/#faq" onClick={(e) => handleNavClick(e, "/#faq")} className="hover:text-white transition-colors">FAQ</a>
              </nav>

              {/* Theme Toggle Button in Topbar */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                className="ht-theme-toggle group flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-all duration-300"
                title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
                data-cursor-text="THEME"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300 transition-transform group-hover:rotate-45" />
                    <span className="hidden sm:inline">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#7c3aed] transition-transform group-hover:-rotate-12" />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                )}
              </button>

              {/* Authenticated Admin pill */}
              {isAuthenticated && (
                <span className="inline-flex items-center gap-1.5 text-white font-medium">
                  <User className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span>{user?.firstName || "Admin"}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── ROW 2: Main navigation bar ── */}
        <div className="ec-navbar">
          <div className="ec-navbar__inner">

            {/* Logo */}
            <Link to="/" className="ec-logo" onClick={() => setMobileOpen(false)}>
              <img src={logo} alt="Ansari Tools" className="ec-logo__img" />
              <div className="ec-logo__text">
                <span className="ec-logo__name">Ansari Tools</span>
                <span className="ec-logo__sub">Digital Marketplace</span>
              </div>
            </Link>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Center Search Bar with Dropdown Container */}
            <div className="ec-search-container">
              <form onSubmit={handleSearch} className="ec-search">
                <input
                  type="text"
                  className="ec-search__input"
                  placeholder="Search for Canva Pro, ChatGPT, SEO Tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                <button type="submit" className="ec-search__btn" aria-label="Search">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="ec-search-dropdown animate-fadeIn">
                  <div className="ec-search-dropdown__list">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                        <Link key={product._id} to={`/product/${product._id}`} className="ec-search-dropdown__item">
                          <div className="ec-search-dropdown__img-wrapper">
                            {product.image ? (
                              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                            ) : (
                              <Search className="w-4 h-4" />
                            )}
                          </div>
                          <div className="ec-search-dropdown__info">
                            <span className="ec-search-dropdown__title">{product.name}</span>
                            <span className="ec-search-dropdown__price">{product.price}</span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="ec-search-dropdown__item" style={{ justifyContent: 'center', color: '#6b7280', fontSize: '13px' }}>
                        No exact tools found
                      </div>
                    )}
                  </div>
                  <div className="ec-search-dropdown__footer">
                    <button type="button" onClick={handleSearch} className="ec-search-dropdown__view-all">
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Right actions */}
            <div className="ec-navbar__actions flex items-center gap-2 sm:gap-3">
              {/* Quick Theme Toggle for fast access */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="ht-theme-toggle p-2 rounded-xl transition-all sm:hidden"
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#7c3aed]" />}
              </button>

              {/* Profile / Store CTA */}
              {isAuthenticated ? (
                <div className="ec-profile" ref={profileRef}>
                  <button className="ec-profile__btn" onClick={() => setProfileOpen(!profileOpen)}>
                    <div className="ec-profile__avatar">
                      {user?.firstName ? user.firstName[0].toUpperCase() : "A"}
                    </div>
                    <div className="ec-profile__info">
                      <span className="ec-profile__name">{user?.firstName || "Admin"}</span>
                      <span className="ec-profile__role">Administrator</span>
                    </div>
                    <ChevronDown className={`ec-profile__chevron ${profileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {profileOpen && (
                    <div className="ec-dropdown animate-fadeIn">
                      <div className="ec-dropdown__header">
                        <p className="ec-dropdown__fullname">{user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}</p>
                        <p className="ec-dropdown__email">{user?.email}</p>
                      </div>
                      <a href="https://dash.ansaritools.com/dashboard" onClick={() => setProfileOpen(false)} className="ec-dropdown__item">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                      </a>
                      <Link to="/admin" onClick={() => setProfileOpen(false)} className="ec-dropdown__item">
                        <Shield className="w-4 h-4" /> Admin Panel
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                      </Link>
                      <Link to="/admin/edit-profile" onClick={() => setProfileOpen(false)} className="ec-dropdown__item">
                        <User className="w-4 h-4" /> Edit Profile
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                      </Link>
                      <Link to="/admin/change-password" onClick={() => setProfileOpen(false)} className="ec-dropdown__item">
                        <Lock className="w-4 h-4" /> Change Password
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                      </Link>
                      {isMainAdmin && (
                        <Link to="/admin/add-admin" onClick={() => setProfileOpen(false)} className="ec-dropdown__item">
                          <UserPlus className="w-4 h-4" /> Make New Admin
                          <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                        </Link>
                      )}
                      <button onClick={async () => { setProfileOpen(false); await logout(); }} className="ec-dropdown__item ec-dropdown__item--danger">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/product" className="ec-cta-btn">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Browse Store</span>
                </Link>
              )}

              {/* Mobile hamburger toggle */}
              <button
                ref={mobileToggleRef}
                className="ec-hamburger"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ┌─────────────────────────────────────────────────────────────┐
          │  MOBILE OVERLAY & DRAWER                                    │
          └─────────────────────────────────────────────────────────────┘ */}
      <div
        className={`ec-overlay ${mobileOpen ? "ec-overlay--visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <nav
        ref={mobileNavRef}
        className={`ec-mobile-drawer ${mobileOpen ? "ec-mobile-drawer--open" : ""}`}
      >
        {/* Drawer header */}
        <div className="ec-drawer__header flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Ansari Tools" className="h-8 w-auto" />
            <span className="ec-drawer__brand font-bold text-white">Ansari Tools</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Drawer Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="ht-theme-toggle p-2 rounded-lg"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#7c3aed]" />}
            </button>
            <button className="ec-drawer__close p-1 text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="ec-drawer__search">
          <form onSubmit={handleSearch} className="ec-drawer__search-form">
            <Search className="w-4 h-4 text-purple-300 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search tools & products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ec-drawer__search-input"
            />
          </form>
        </div>

        {/* Mobile links */}
        <div className="ec-drawer__links">
          <p className="ec-drawer__section-label">Navigation Menu</p>
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `ec-drawer__link ${isActive && item.path !== "/#pricing" && item.path !== "/#tools" && item.path !== "/#reviews" && item.path !== "/#faq" ? "ec-drawer__link--active" : ""}`}
              onClick={(e) => {
                setMobileOpen(false);
                handleNavClick(e, item.path);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Drawer footer with updated WhatsApp button */}
        <div className="ec-drawer__footer p-4 border-t border-white/10">
          <a
            href="https://wa.me/923227866655?text=Hello%20Ansari%20Tools%2C%20I%20am%20contacting%20you%20through%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="ec-drawer__whatsapp flex items-center justify-center py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg"
            onClick={() => setMobileOpen(false)}
          >
            <Phone className="w-4 h-4 text-white mr-2" />
            <span>WhatsApp: 0322 7866655</span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;
