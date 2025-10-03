import React from "react";
import { DollarSign, ShieldCheck, Headphones, RefreshCcw, Zap, Shield } from "lucide-react";

const Item = ({ icon, title, desc, color, iconStyle }) => (
  <div className="group bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color}`} style={iconStyle}>
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:opacity-80 transition-colors duration-200">
      {title}
    </h3>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
      {desc}
    </p>
  </div>
);

const WhyChooseUsComponent = () => (
  <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--color-light)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
          <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
          Why Choose Us
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--color-dark)' }}>
          Why Choose AnsariTools
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto" style={{ color: 'var(--color-mid-dark)' }}>
          Discover what makes us the preferred choice for premium digital tools
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <Item 
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-mid-light)' }}
          icon={<DollarSign className="w-6 h-6 text-white" />} 
          title="Cost Savings" 
          desc="Save up to 90% compared to individual subscriptions for each tool" 
        />
        <Item 
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-mid-dark)' }}
          icon={<ShieldCheck className="w-6 h-6 text-white" />} 
          title="100% Legal" 
          desc="All accounts are legally purchased with proper licensing" 
        />
        <Item 
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-dark)' }}
          icon={<Headphones className="w-6 h-6 text-white" />} 
          title="24/7 Support" 
          desc="Get help anytime with our dedicated customer support team" 
        />
        <Item 
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-mid-light)' }}
          icon={<RefreshCcw className="w-6 h-6 text-white" />} 
          title="Regular Updates" 
          desc="We continuously add new tools to our collection" 
        />
        <Item 
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-mid-dark)' }}
          icon={<Zap className="w-6 h-6 text-white" />} 
          title="Reliable Access" 
          desc="99.9% uptime guarantee for all tools and services" 
        />
        <Item 
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-dark)' }}
          icon={<Shield className="w-6 h-6 text-white" />} 
          title="Privacy Focused" 
          desc="Your data remains private and secure with our service" 
        />
      </div>

      {/* Stats Counter */}
      <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="group">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--color-dark)' }}>
              10,000+
            </h3>
            <p className="text-gray-600 text-sm sm:text-base font-medium">Happy Customers</p>
          </div>
          <div className="group">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--color-mid-dark)' }}>
              50+
            </h3>
            <p className="text-gray-600 text-sm sm:text-base font-medium">Premium Tools</p>
          </div>
          <div className="group">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--color-dark)' }}>
              99.9%
            </h3>
            <p className="text-gray-600 text-sm sm:text-base font-medium">Customer Satisfaction</p>
          </div>
          <div className="group">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--color-mid-dark)' }}>
              24/7
            </h3>
            <p className="text-gray-600 text-sm sm:text-base font-medium">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUsComponent;
