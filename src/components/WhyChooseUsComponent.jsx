import React from "react";
import { DollarSign, ShieldCheck, Headphones, RefreshCcw, Zap, Shield } from "lucide-react";

const Item = ({ icon, title, desc, color }) => (
  <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${color}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {desc}
    </p>
  </div>
);

const WhyChooseUsComponent = () => (
  <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Shield className="w-4 h-4" />
          Why Choose Us
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
          Why Choose AnsariTools
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover what makes us the preferred choice for premium digital tools
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Item 
          color="bg-gradient-to-r from-green-500 to-emerald-600" 
          icon={<DollarSign className="w-8 h-8 text-white" />} 
          title="Cost Savings" 
          desc="Save up to 90% compared to individual subscriptions for each tool" 
        />
        <Item 
          color="bg-gradient-to-r from-blue-500 to-blue-600" 
          icon={<ShieldCheck className="w-8 h-8 text-white" />} 
          title="100% Legal" 
          desc="All accounts are legally purchased with proper licensing" 
        />
        <Item 
          color="bg-gradient-to-r from-purple-500 to-purple-600" 
          icon={<Headphones className="w-8 h-8 text-white" />} 
          title="24/7 Support" 
          desc="Get help anytime with our dedicated customer support team" 
        />
        <Item 
          color="bg-gradient-to-r from-yellow-500 to-orange-500" 
          icon={<RefreshCcw className="w-8 h-8 text-white" />} 
          title="Regular Updates" 
          desc="We continuously add new tools to our collection" 
        />
        <Item 
          color="bg-gradient-to-r from-red-500 to-red-600" 
          icon={<Zap className="w-8 h-8 text-white" />} 
          title="Reliable Access" 
          desc="99.9% uptime guarantee for all tools and services" 
        />
        <Item 
          color="bg-gradient-to-r from-cyan-500 to-blue-500" 
          icon={<Shield className="w-8 h-8 text-white" />} 
          title="Privacy Focused" 
          desc="Your data remains private and secure with our service" 
        />
      </div>

      {/* Stats Counter */}
      <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl p-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              10,000+
            </h3>
            <p className="text-gray-600 text-lg font-medium">Happy Customers</p>
          </div>
          <div className="group">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              50+
            </h3>
            <p className="text-gray-600 text-lg font-medium">Premium Tools</p>
          </div>
          <div className="group">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              99.9%
            </h3>
            <p className="text-gray-600 text-lg font-medium">Customer Satisfaction</p>
          </div>
          <div className="group">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              24/7
            </h3>
            <p className="text-gray-600 text-lg font-medium">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUsComponent;
