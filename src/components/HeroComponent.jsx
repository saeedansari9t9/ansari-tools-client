import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Crown } from "lucide-react";

const HeroComponent = () => (
  <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-300/10 rounded-full blur-2xl"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
          <Crown className="w-4 h-4" />
          Premium AI Tools Subscription
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Premium Digital Tools
          <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            At Unbeatable Prices
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
          Access premium AI tools like ChatGPT, Canva Pro, SEMrush, Moz,
          Ubersuggest, Leonardo AI and more at affordable subscription plans.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link 
            to="/pricing" 
            className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/tools" 
            className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            View Tools
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
            <div className="text-blue-200 text-lg">Premium Tools</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">90%</div>
            <div className="text-blue-200 text-lg">Cost Savings</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">10K+</div>
            <div className="text-blue-200 text-lg">Happy Users</div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
);

export default HeroComponent;
