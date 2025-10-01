import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const CTAComponent = () => (
  <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(to right, var(--color-dark), var(--color-mid-dark))' }}>
    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-light)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-mid-light)' }}></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center gap-2 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-8 shadow-lg" style={{ backgroundColor: 'var(--color-mid-light)' }}>
        <Sparkles className="w-4 h-4" />
        Limited Time Offer
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
        Ready to Access Premium Tools
        <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          at Affordable Prices?
        </span>
      </h2>
      
      <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--color-light)' }}>
        Join thousands of professionals who trust our premium AI tools and save up to 90% on subscriptions
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <a 
          href="/pricing" 
          className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Get Started Today
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        
        <a 
          href="/tools" 
          className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
        >
          View All Tools
        </a>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
          <div className="text-blue-200 text-lg">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
          <div className="text-blue-200 text-lg">Premium Tools</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
          <div className="text-blue-200 text-lg">Uptime Guarantee</div>
        </div>
      </div>
    </div>
  </section>
);

export default CTAComponent;
