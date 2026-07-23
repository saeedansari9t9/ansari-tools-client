import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Menu, X, User, LogOut, ChevronDown,
  UserPlus, Shield, Lock, LayoutDashboard,
  Search, ShoppingBag, Phone, ChevronRight,
  Star, Tag, Wrench, HelpCircle, Home, Package
} from "lucide-react";
import logo from "../assets/images/ansari-tools-logo-purple.png";
import { logoutAll } from "../services/logout";
import { useProducts } from "../hooks/useProducts";

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
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", path);
      }
    }
  };

  return (
    <>
      {/* ┌────────────────────────────────────────────────────────────┐
          │  MAIN NAVBAR                                               │
          └────────────────────────────────────────────────────────────┘ */}
      <header className={`ec-header ${scrolled ? "ec-header--scrolled" : ""}`}>

        {/* ── ROW 1: Top utility bar ── */}
        <div className="ec-topbar">
          <div className="ec-topbar__inner">
            {/* Left: WhatsApp */}
            <div className="ec-topbar__left">
              <a href="https://wa.me/923102204842" target="_blank" rel="noopener noreferrer" className="ec-topbar__link">
                <Phone className="w-3 h-3" />
                <span>24/7 Support</span>
              </a>
            </div>

            {/* Center: Nav Links */}
            <nav className="ec-topbar__nav">
              {navLinks.map((item, index) => (
                <React.Fragment key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={({ isActive }) => `ec-topbar__nav-link ${isActive && item.path !== "/#pricing" && item.path !== "/#tools" && item.path !== "/#reviews" && item.path !== "/#faq" ? "ec-topbar__nav-link--active" : ""}`}
                  >
                    {item.label}
                  </NavLink>
                  {index < navLinks.length - 1 && (
                    <span className="ec-topbar__nav-divider">|</span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Right: Tagline or Admin */}
            <div className="ec-topbar__right">
              {isAuthenticated ? (
                <span className="ec-topbar__link">
                  <User className="w-3 h-3" />
                  {user?.firstName || "Admin"}
                </span>
              ) : (
                <span className="ec-topbar__tagline">✦ Premium Digital Tools</span>
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

            {/* Spacer to push search center and actions right */}
            <div style={{flex:1}} />

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
                              <img src={product.image} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px'}} />
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
                      <div className="ec-search-dropdown__item" style={{justifyContent: 'center', color: '#6b7280', fontSize: '13px'}}>
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
            <div style={{flex:1}} />

            {/* Right actions */}
            <div className="ec-navbar__actions">
              {/* Profile / Admin */}
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

              {/* Mobile toggle */}
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
        <div className="ec-drawer__header">
          <img src={logo} alt="Ansari Tools" className="h-8 w-auto" />
          <span className="ec-drawer__brand">Ansari Tools</span>
          <button className="ec-drawer__close" onClick={() => setMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
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
          <p className="ec-drawer__section-label">Menu</p>
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
              <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              <p className="ec-drawer__section-label" style={{ marginTop: "16px" }}>Admin</p>
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="ec-drawer__link">
                <Shield className="w-4 h-4" /><span>Admin Panel</span><ChevronRight className="w-4 h-4 ml-auto opacity-30" />
              </Link>
              <Link to="/admin/edit-profile" onClick={() => setMobileOpen(false)} className="ec-drawer__link">
                <User className="w-4 h-4" /><span>Edit Profile</span><ChevronRight className="w-4 h-4 ml-auto opacity-30" />
              </Link>
              {isMainAdmin && (
                <Link to="/admin/add-admin" onClick={() => setMobileOpen(false)} className="ec-drawer__link">
                  <UserPlus className="w-4 h-4" /><span>New Admin</span><ChevronRight className="w-4 h-4 ml-auto opacity-30" />
                </Link>
              )}
              <button onClick={async () => { setMobileOpen(false); await logout(); }} className="ec-drawer__link ec-drawer__link--danger">
                <LogOut className="w-4 h-4" /><span>Logout</span>
              </button>
            </>
          )}
        </div>

        {/* Drawer CTA */}
        <div className="ec-drawer__footer">
          <Link to="/product" onClick={() => setMobileOpen(false)} className="ec-drawer__cta">
            <ShoppingBag className="w-4 h-4" />
            Browse All Products
          </Link>
          <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer" className="ec-drawer__whatsapp">
            📲 WhatsApp Support
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;
