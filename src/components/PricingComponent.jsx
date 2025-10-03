import React, { useState } from "react";
import { Check, Star, Crown, Zap, ChevronDown, ChevronUp } from "lucide-react";

const PricingComponent = () => {
  const [showAllStudent, setShowAllStudent] = useState(false);
  const [showAllAgency, setShowAllAgency] = useState(false);
  const [showAllBlogging, setShowAllBlogging] = useState(false);

  const studentTools = ["Semrush","Mozz Pro","UbberSuggest","Quillbot Premium","Canva Pro","Grammarly","WordTune","VistaCreate","SeoPtimer","PicMonkey"];
  
  const agencyTools = [
    "Semrush","Mozz Pro","UbberSuggest","Quillbot Premium","Canva Pro",
    "Grammarly","WordTune","VistaCreate","SeoPtimer","PicMonkey",
    "Envato Elements","StoryBlock","Viral Launch","VidiQ Boost Plan",
    "Motion Array","Capcut Pro","SkillShare","Helium 10","PicsArt Pro",
    "Pocdora","Niche Scraper","WriteSonic","Design.Ai","Prezi",
    "You.com","Turnitin Student","Coursera Plus","Placeit Unlimited",
    "Jasper AI","Perplexity AI","LongTailPro","Word.ai"
  ];
  
  const bloggingTools = [
    "Semrush","Mozz Pro","UbberSuggest","Quillbot Premium","Canva Pro",
    "Grammarly","WordTune","VistaCreate","SeoPtimer","PicMonkey",
    "WriteSonic","Design.Ai","Prezi","You.com","Turnitin Student",
    "Coursera Plus","Jasper AI","Perplexity AI","LongTailPro","Word.ai"
  ];

  return (
  <section id="pricing" className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--color-light)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
          <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
          Pricing Plans
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--color-dark)' }}>
          Choose Your Perfect Plan
        </h2>
        <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-mid-dark)' }}>
          Select the plan that best fits your needs and start saving on premium tools today
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
        {/* Student Plan */}
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-gray-200">
          <div className="p-4 sm:p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 text-white rounded-xl mb-3" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Student Plan</h3>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">1199 PKR</div>
              <p className="text-sm text-gray-600">per month</p>
            </div>
            
            <div className="space-y-3 mb-4">
              {(showAllStudent ? studentTools : studentTools.slice(0, 8))
                .map((tool) => (
                <div key={tool} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{tool}</span>
                </div>
              ))}
            </div>
            
            {studentTools.length > 8 && (
              <button
                onClick={() => setShowAllStudent(!showAllStudent)}
                className="w-full mb-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-200" style={{ color: 'var(--color-mid-dark)' }}
              >
                {showAllStudent ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    See More ({studentTools.length - 8} more tools)
                  </>
                )}
              </button>
            )}
            
            <button className="w-full text-white py-3 px-4 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
              Get Started
            </button>
          </div>
        </div>

        {/* Agency Plan - Featured */}
        <div className="relative">
          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2" style={{ borderColor: 'var(--color-mid-dark)' }}>
            {/* Popular Badge - Top positioned, half inside half outside */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-30" style={{ backgroundColor: 'var(--color-dark)' }}>
              Most Popular
            </div>
            
            <div className="p-4 sm:p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 text-white rounded-xl mb-3" style={{ backgroundColor: 'var(--color-dark)' }}>
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Agency Plan</h3>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">2399 PKR</div>
              <p className="text-sm text-gray-600">per month</p>
            </div>
            
            <div className="space-y-3 mb-4">
              {(showAllAgency ? agencyTools : agencyTools.slice(0, 8))
                .map((tool, i) => (
                <div key={tool + i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-dark)' }}>
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{tool}</span>
                </div>
              ))}
            </div>
            
            {agencyTools.length > 8 && (
              <button
                onClick={() => setShowAllAgency(!showAllAgency)}
                className="w-full mb-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-200" style={{ color: 'var(--color-dark)' }}
              >
                {showAllAgency ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    See More ({agencyTools.length - 8} more tools)
                  </>
                )}
              </button>
            )}
            
            <button className="w-full text-white py-3 px-4 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: 'var(--color-dark)' }}>
              Get Started
            </button>
            </div>
          </div>
        </div>

        {/* Blogging Plan */}
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-gray-200">
          <div className="p-4 sm:p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 text-white rounded-xl mb-3" style={{ backgroundColor: 'var(--color-mid-light)' }}>
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Blogging Plan</h3>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">1799 PKR</div>
              <p className="text-sm text-gray-600">per month</p>
            </div>
            
            <div className="space-y-3 mb-4">
              {(showAllBlogging ? bloggingTools : bloggingTools.slice(0, 8))
                .map((tool) => (
                <div key={tool} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-mid-light)' }}>
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{tool}</span>
                </div>
              ))}
            </div>
            
            {bloggingTools.length > 8 && (
              <button
                onClick={() => setShowAllBlogging(!showAllBlogging)}
                className="w-full mb-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-200" style={{ color: 'var(--color-mid-light)' }}
              >
                {showAllBlogging ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    See More ({bloggingTools.length - 8} more tools)
                  </>
                )}
              </button>
            )}
            
            <button className="w-full text-white py-3 px-4 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: 'var(--color-mid-light)' }}>
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-8 sm:mt-12">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-4 sm:p-6 shadow-xl max-w-3xl mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            Need a Custom Plan?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Contact us for enterprise solutions and custom integrations
          </p>
          <button className="text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-dark)' }}>
            Contact Sales Team
          </button>
        </div>
      </div>
    </div>
  </section>
  );
};

export default PricingComponent;
