import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";

const FooterComponent = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div className="lg:col-span-1">
          <div className="flex items-center space-x-3 mb-6">
            <img 
              src="/src/assets/images/footer-logo.png" 
              alt="AnsariTools Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ANSARI TOOLS
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            Premium digital tools at unbeatable prices. Save up to 90% on your
            favorite software subscriptions.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/lexorasolution/" 
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Site Map */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">SITE MAP</h4>
          <ul className="space-y-3">
            <li>
              <a 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/pricing" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                Pricing
              </a>
            </li>
            <li>
              <a 
                href="/tools" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                Tools
              </a>
            </li>
            <li>
              <a 
                href="/testimonials" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a 
                href="/faq" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">LEGAL</h4>
          <ul className="space-y-3">
            <li>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">CONTACT US</h4>
          <ul className="space-y-4">
            <li>
              <a 
                href="mailto:ansaritools3@gmail.com" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3"
              >
                <Mail className="w-5 h-5" />
                ansaritools3@gmail.com
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Live Chat
              </a>
            </li>
            <li>
              <a 
                href="tel:+923102204842" 
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-3"
              >
                <Phone className="w-5 h-5" />
                +92 310 220 4842
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Ansari Tools. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <span>Made with ❤️ in Pakistan</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterComponent;
