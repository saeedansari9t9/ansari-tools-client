import React, { useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  CreditCard,
  UserPlus,
  User,
  Lock,
  LogOut,
  Globe,
  Menu,
  X,
  Shield,
  ChevronDown
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { logoutAll } from "../services/logout";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
    isActive
      ? "bg-slate-800 text-white shadow-md shadow-slate-900/10 font-semibold"
      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
  }`;

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logoutAll();
      logout();
      navigate("/admin/login");
    }
  };

  const navItems = [
    {
      to: "/admin",
      label: "Products",
      icon: LayoutDashboard,
      end: true
    },
    {
      to: "/admin/canva-subscriptions",
      label: "Canva Subscriptions",
      icon: Users
    },
    {
      to: "/admin/sales",
      label: "Sales Dashboard",
      icon: BarChart3
    },
    {
      to: "/admin/expenses",
      label: "Expenses",
      icon: CreditCard
    },
    {
      to: "/admin/add-admin",
      label: "Manage Admins",
      icon: UserPlus
    },
    {
      to: "/admin/edit-profile",
      label: "Edit Profile",
      icon: User
    },
    {
      to: "/admin/change-password",
      label: "Change Password",
      icon: Lock
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-r border-slate-800 w-64 shrink-0">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/80">
        <img src={logo} alt="Ansari Tools" className="h-10 w-auto" />
        <div>
          <div className="font-bold text-white leading-tight">Ansari Tools</div>
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            <item.icon className="w-5 h-5 opacity-80" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-all w-full"
        >
          <Globe className="w-5 h-5 opacity-80" />
          Return to Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all w-full cursor-pointer"
        >
          <LogOut className="w-5 h-5 opacity-80" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">{sidebarContent}</div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer content */}
          <div className="relative flex flex-col h-full w-64 bg-slate-950 animate-slide-in-left">
            {sidebarContent}
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200/80 shrink-0 z-10">
          {/* Left: Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Spacer on Desktop */}
          <div className="hidden lg:block text-slate-400 font-medium text-sm">
            Welcome to your administration workspace.
          </div>

          {/* Right: Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 font-semibold text-sm">
                <Shield className="w-4 h-4 text-slate-500" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  {admin?.firstName ? `${admin.firstName} ${admin.lastName}` : admin?.email || "Admin"}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Administrator</div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-1.5 z-20 animate-fade-in-up">
                  <Link
                    to="/admin/edit-profile"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2.5 text-slate-400" />
                    Edit Profile
                  </Link>
                  <Link
                    to="/admin/change-password"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Lock className="w-4 h-4 mr-2.5 text-slate-400" />
                    Change Password
                  </Link>
                  <hr className="my-1 border-slate-100" />
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2.5 text-red-500" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
