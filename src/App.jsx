// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShoppingCart, Star, Check, ArrowRight, Menu, X, Search, User, Heart, Zap, Palette, PenTool, BarChart3, Bot, Globe, Shield, Users, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnsariToolsPage from './pages/AnsariToolsPage'
import NavBarComponent from "./components/NavBarComponent";
import FooterComponent from "./components/FooterComponent";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatBotButton from "./components/ChatBotButton";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import ToolsPage from "./pages/ToolsPage";
import WhyChoosePage from "./pages/WhyChoosePage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FAQPage from "./pages/FAQPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProductPage from "./pages/Admin/AddProductPage";
import EditProductPage from "./pages/Admin/EditProductPage";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProductPage />} />
          <Route path="/admin/edit-product/:id" element={<EditProductPage />} />
          {/* <PrivateRoute path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
        <FooterComponent />
        <WhatsAppButton />
        <ChatBotButton />
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