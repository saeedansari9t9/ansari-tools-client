// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ShoppingCart, Star, Check, ArrowRight, Menu, X, Search, User, Heart, Zap, Palette, PenTool, BarChart3, Bot, Globe, Shield, Users, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnsariToolsPage from './pages/AnsariToolsPage'
import NavBarComponent from "./components/NavBarComponent";
import FooterComponent from "./components/FooterComponent";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminGuard from "./components/AdminGuard";

import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ToolsPage from "./pages/ToolsPage";
import WhyChoosePage from "./pages/WhyChoosePage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FAQPage from "./pages/FAQPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProductPage from "./pages/Admin/AddProductPage";
import EditProductPage from "./pages/Admin/EditProductPage";
import CanvaSubscriptionsPage from "./pages/Admin/CanvaSubscriptionsPage";
import AddCanvaSubscriptionPage from "./pages/Admin/AddCanvaSubscriptionPage";
import AddAdminPage from "./pages/Admin/AddAdminPage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import EditProfilePage from "./pages/Admin/EditProfilePage";
import ChangePasswordPage from "./pages/Admin/ChangePasswordPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* head tags (fonts/icons) go in public/index.html */}
        <NavBarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/why" element={<WhyChoosePage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          {/* Admin Auth routes - hidden from public access */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          
          {/* Admin Routes - Protected by AdminGuard */}
          <Route path="/admin" element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          } />
          <Route path="/admin/add-product" element={
            <AdminGuard>
              <AddProductPage />
            </AdminGuard>
          } />
          <Route path="/admin/edit-product/:id" element={
            <AdminGuard>
              <EditProductPage />
            </AdminGuard>
          } />
          <Route path="/admin/canva-subscriptions" element={
            <AdminGuard>
              <CanvaSubscriptionsPage />
            </AdminGuard>
          } />
          <Route path="/admin/add-canva-subscription" element={
            <AdminGuard>
              <AddCanvaSubscriptionPage />
            </AdminGuard>
          } />
          <Route path="/admin/add-admin" element={
            <AdminGuard>
              <AddAdminPage />
            </AdminGuard>
          } />
          <Route path="/admin/edit-profile" element={
            <AdminGuard>
              <EditProfilePage />
            </AdminGuard>
          } />
          <Route path="/admin/change-password" element={
            <AdminGuard>
              <ChangePasswordPage />
            </AdminGuard>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          {/* Catch-all route - redirect any non-existent page to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* <PrivateRoute path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
        <FooterComponent />
        <WhatsAppButton />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App