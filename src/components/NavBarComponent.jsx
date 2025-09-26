import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User, LogOut, LogIn } from "lucide-react";
import logo from "../assets/images/logo.png";

const NavBarComponent = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();

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
    };

    // Prevent body scroll when sidebar is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3" onClick={() => setOpen(false)}>
            <img 
              src={logo} 
              alt="Ansari Tools" 
              className="h-10 w-auto"
            />
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              ANSARI TOOLS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className="text-white hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Home
            </NavLink>
            <NavLink 
              to="/product" 
              className="text-white hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Products
            </NavLink>
            <NavLink 
              to="/pricing" 
              className="text-white hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Pricing
            </NavLink>
            <NavLink 
              to="/tools" 
              className="text-white hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Tools
            </NavLink>
            <NavLink 
              to="/testimonials" 
              className="text-white hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Testimonials
            </NavLink>
            <NavLink 
              to="/faq" 
              className="text-white hover:text-blue-300 font-medium transition-colors duration-200"
            >
              FAQ
            </NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

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
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 backdrop-blur-2xl transform transition-all duration-300 ease-in-out ${
          open ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}
      >
          <div className="flex flex-col h-full bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-2xl">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <img 
                  src={logo} 
                  alt="Ansari Tools" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ANSARI TOOLS</span>
              </div>
              <button
                className="p-2 rounded-lg text-white hover:bg-white/20"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 px-4 py-6 bg-gradient-to-b from-gray-900/90 to-blue-900/90 backdrop-blur-xl">
              <ul className="space-y-4" onClick={() => setOpen(false)}>
                <li>
                  <NavLink 
                    to="/" 
                    className="block px-4 py-3 text-lg font-medium text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/product" 
                    className="block px-4 py-3 text-lg font-medium text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/pricing" 
                    className="block px-4 py-3 text-lg font-medium text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    Pricing
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/tools" 
                    className="block px-4 py-3 text-lg font-medium text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    Tools
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/testimonials" 
                    className="block px-4 py-3 text-lg font-medium text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    Testimonials
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/faq" 
                    className="block px-4 py-3 text-lg font-medium text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    FAQ
                  </NavLink>
                </li>
                
                {/* Mobile Auth Button - Moved here after FAQ */}
                <li className="pt-4">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  );
};

export default NavBarComponent;
