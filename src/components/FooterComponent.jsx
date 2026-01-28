import React from "react";
import { Facebook, Twitter, Instagram, LinkedinIcon, Mail, Phone, MessageCircle } from "lucide-react";
import footerLogo from "../assets/images/logo.png";

const FooterComponent = () => (
  <footer className="text-white" style={{ backgroundColor: 'var(--color-dark)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Logo and Description */}
        <div className="lg:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <img 
              src={footerLogo} 
              alt="AnsariTools Logo" 
              className="h-12 w-auto"
            />
            {/* <span className="text-lg sm:text-xl font-bold text-white">
              ANSARI TOOLS
            </span> */}
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-light)' }}>
            Premium digital tools at unbeatable prices. Save up to 90% on your
            favorite software subscriptions.
          </p>
          <div className="flex space-x-3">
            <a 
              href="#" 
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:opacity-80"
              style={{ backgroundColor: 'var(--color-light)' , color: 'var(--color-dark)' }}
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:opacity-80"
              style={{ backgroundColor: 'var(--color-light)' , color: 'var(--color-dark)' }}
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://www.instagram.com/lexorasolution/" 
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:opacity-80"
              style={{ backgroundColor: 'var(--color-light)' , color: 'var(--color-dark)' }}
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:opacity-80"
              style={{ backgroundColor: 'var(--color-light)' , color: 'var(--color-dark)' }}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Available Pages */}
        <div>
          <h4 className="text-base font-bold mb-4 text-white">PAGES</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="/" 
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--color-light)' }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/pricing" 
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--color-light)' }}
              >
                Pricing
              </a>
            </li>
            <li>
              <a 
                href="/tools" 
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--color-light)' }}
              >
                Tools
              </a>
            </li>
            <li>
              <a 
                href="/why" 
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--color-light)' }}
              >
                Why Choose Us
              </a>
            </li>
            <li>
              <a 
                href="/testimonials" 
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--color-light)' }}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a 
                href="/faq" 
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--color-light)' }}
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-base font-bold mb-4 text-white">CONTACT</h4>
          <ul className="space-y-3">
            <li>
              <a 
                href="mailto:ansaritools3@gmail.com" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                ansaritools3@gmail.com
              </a>
            </li>
            <li>
              <a 
                href="tel:+923102204842" 
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                +92 310 220 4842
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 mt-6 sm:mt-8 pt-4 sm:pt-6">
        <div className="text-center">
          <p className="text-gray-300 text-xs sm:text-sm">
            © {new Date().getFullYear()} Ansari Tools. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterComponent;
