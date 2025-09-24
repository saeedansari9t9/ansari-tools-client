import React from "react";
import { Check, Star, Crown, Zap } from "lucide-react";

const PricingComponent = () => (
  <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Crown className="w-4 h-4" />
          Pricing Plans
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
          Choose Your Perfect Plan
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select the plan that best fits your needs and start saving on premium tools today
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Student Plan */}
        <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-green-200">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Student Plan</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">1199 PKR</div>
              <p className="text-gray-600">per month</p>
            </div>
            
            <div className="space-y-4 mb-8">
              {["Semrush","Mozz Pro","UbberSuggest","Quillbot Premium","Canva Pro","Grammarly","WordTune","VistaCreate","SeoPtimer","PicMonkey"]
                .map((tool) => (
                <div key={tool} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{tool}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>

        {/* Agency Plan - Featured */}
        <div className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 border-blue-200 relative mt-6">
          {/* Popular Badge - Half outside, half inside */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-30">
            Most Popular
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl mb-4">
                <Crown className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Agency Plan</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">2399 PKR</div>
              <p className="text-gray-600">per month</p>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                "Semrush","Mozz Pro","UbberSuggest","Quillbot Premium","Canva Pro",
                "Grammarly","WordTune","VistaCreate","SeoPtimer","PicMonkey",
                "Envato Elements","StoryBlock","Viral Launch","VidiQ Boost Plan",
                "Motion Array","Capcut Pro","SkillShare","Helium 10","PicsArt Pro",
                "Pocdora","Niche Scraper","WriteSonic","Design.Ai","Prezi",
                "You.com","Turnitin Student","Coursera Plus","Placeit Unlimited",
                "Jasper AI","Perplexity AI","LongTailPro","Word.ai"
              ].map((tool, i) => (
                <div key={tool + i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{tool}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>

        {/* Blogging Plan */}
        <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-purple-200">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Blogging Plan</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">1799 PKR</div>
              <p className="text-gray-600">per month</p>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                "Semrush","Mozz Pro","UbberSuggest","Quillbot Premium","Canva Pro",
                "Grammarly","WordTune","VistaCreate","SeoPtimer","PicMonkey",
                "WriteSonic","Design.Ai","Prezi","You.com","Turnitin Student",
                "Coursera Plus","Jasper AI","Perplexity AI","LongTailPro","Word.ai"
              ].map((tool) => (
                <div key={tool} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{tool}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Plan?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact us for enterprise solutions and custom integrations
          </p>
          <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
            Contact Sales Team
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default PricingComponent;
