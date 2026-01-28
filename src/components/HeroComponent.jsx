import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Crown } from "lucide-react";

const HeroComponent = () => (
  <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen overflow-hidden w-full" style={{ backgroundColor: 'var(--color-light)' }} itemScope itemType="https://schema.org/WebPage">
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
      <div className="text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 lg:mb-8 shadow-lg" style={{ backgroundColor: 'var(--color-dark)', color: 'white' }}>
          <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
          Premium AI Tools Subscription
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: 'var(--color-dark)' }} itemProp="headline">
          Premium Digital Tools
          <span className="block" style={{ color: 'var(--color-dark)' }}>
            At Unbeatable Prices
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed" itemProp="description">
          Access premium AI tools like ChatGPT, Canva Pro, SEMrush, Moz,
          Ubersuggest, Leonardo AI and more at affordable subscription plans.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center mb-8 sm:mb-10 lg:mb-12">
          <Link
            to="/pricing"
            className="group px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
            style={{ background: 'linear-gradient(to right, var(--color-mid-dark), var(--color-dark))', color: 'white' }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Start</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/tools"
            className="group backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-base border-2 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 hover:opacity-80"
            style={{ backgroundColor: 'var(--color-mid-light)', borderColor: 'var(--color-mid-dark)', color: 'var(--color-dark)' }}
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View Tools</span>
            <span className="sm:hidden">Tools</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1" itemProp="description">50+</div>
            <div className="text-xs sm:text-sm" itemProp="description">Premium Tools</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1" itemProp="description">90%</div>
            <div className="text-xs sm:text-sm" itemProp="description">Cost Savings</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1" itemProp="description">10K+</div>
            <div className="text-xs sm:text-sm" itemProp="description">Happy Users</div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-5 h-8 border-2 rounded-full flex justify-center" style={{ borderColor: 'var(--color-dark)' }}>
        <div className="w-1 h-2 rounded-full mt-1.5 animate-pulse" style={{ backgroundColor: 'var(--color-dark)' }}></div>
      </div>
    </div>
  </section>
);

export default HeroComponent;
