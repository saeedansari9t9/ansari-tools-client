import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X, User, LogOut, Settings, ChevronDown, UserPlus, Shield, Lock } from "lucide-react";
import logo from "../assets/images/logo.png";

const NavBarComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const profileRef = useRef(null);
  const { isAuthenticated, logout, user } = useAuth();
  
  // Check if current user is the main admin
  const isMainAdmin = user && user.email === 'saeedansari9t9@gmail.com';

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
  }, [open, profileDropdown]);

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

          {/* Desktop Auth Buttons - Only show for authenticated admins */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email || 'Profile'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile Dropdown */}
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        Administrator
                      </p>
                    </div>
                    
                    <div className="py-1">
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
                      
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <Shield className="w-4 h-4 mr-3" />
                        Admin Panel
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
                        onClick={() => {
                          logout();
                          setProfileDropdown(false);
                          navigate('/');
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
        className={`lg:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw] z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 backdrop-blur-2xl transform transition-all duration-300 ease-in-out ${
          open ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}
      >
          <div className="flex flex-col h-full bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-2xl">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 backdrop-blur-sm flex-shrink-0">
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
            <div className="flex-1 px-4 py-6 bg-gradient-to-b from-gray-900/90 to-blue-900/90 backdrop-blur-xl overflow-y-auto min-h-0">
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
                
                {/* Mobile Auth Buttons - Only show for authenticated admins */}
                {isAuthenticated && (
                  <>
                    <li className="pt-4 border-t border-white/20">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-white">
                          {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                        </p>
                        <p className="text-xs text-blue-200">
                          {user?.email}
                        </p>
                        <p className="text-xs text-blue-300 font-medium">
                          Administrator
                        </p>
                      </div>
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
                    <li>
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="w-full flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200"
                      >
                        <Shield className="w-5 h-5" />
                        <span>Admin Panel</span>
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
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center space-x-2 px-6 py-3 text-red-300 rounded-lg font-medium hover:bg-red-500/20 transition-all duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
    </>
  );
};

export default NavBarComponent;
