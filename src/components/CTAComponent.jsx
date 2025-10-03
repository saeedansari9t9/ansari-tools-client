import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const CTAComponent = () => (
  <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--color-dark)' }}>
    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-light)', opacity: 0.1 }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-mid-light)', opacity: 0.1 }}></div>
    </div>

    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center gap-2 backdrop-blur-sm text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg" style={{ backgroundColor: 'var(--color-mid-light)' }}>
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
        Limited Time Offer
      </div>
      
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
        Ready to Access Premium Tools
        <span className="block text-white opacity-90">
          at Affordable Prices?
        </span>
      </h2>
      
      <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--color-light)' }}>
        Join thousands of professionals who trust our premium AI tools and save up to 90% on subscriptions
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
        <a 
          href="/pricing" 
          className="group text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2" style={{ backgroundColor: 'var(--color-mid-light)' }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          Get Started Today
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        
        <a 
          href="/tools" 
          className="group bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
        >
          View All Tools
        </a>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">10K+</div>
          <div className="text-sm sm:text-base" style={{ color: 'var(--color-light)' }}>Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
          <div className="text-sm sm:text-base" style={{ color: 'var(--color-light)' }}>Premium Tools</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">99.9%</div>
          <div className="text-sm sm:text-base" style={{ color: 'var(--color-light)' }}>Uptime Guarantee</div>
        </div>
      </div>
    </div>
  </section>
);

export default CTAComponent;
