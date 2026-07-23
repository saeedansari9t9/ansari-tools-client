import React, { useState } from "react";
import { Check, Star, Crown, Zap, ChevronDown, ChevronUp, Sparkles, Building2, MonitorSmartphone } from "lucide-react";

const PricingComponent = () => {
  const [showAllStudent, setShowAllStudent] = useState(false);
  const [showAllAgency, setShowAllAgency] = useState(false);
  const [showAllBlogging, setShowAllBlogging] = useState(false);

  const studentTools = ["Semrush", "Moz Pro", "Ubersuggest", "Quillbot Premium", "Canva Pro", "Grammarly", "WordTune", "VistaCreate", "SeoPtimer", "PicMonkey"];
  
  const agencyTools = [
    "Semrush", "Moz Pro", "Ubersuggest", "Quillbot Premium", "Canva Pro",
    "Grammarly", "WordTune", "VistaCreate", "SeoPtimer", "PicMonkey",
    "Envato Elements", "StoryBlock", "Viral Launch", "VidiQ Boost",
    "Motion Array", "Capcut Pro", "SkillShare", "Helium 10", "PicsArt Pro",
    "Pocdora", "Niche Scraper", "WriteSonic", "Design.Ai", "Prezi",
    "You.com", "Turnitin", "Coursera Plus", "Placeit",
    "Jasper AI", "Perplexity AI", "LongTailPro", "Word.ai"
  ];
  
  const bloggingTools = [
    "Semrush", "Moz Pro", "Ubersuggest", "Quillbot Premium", "Canva Pro",
    "Grammarly", "WordTune", "VistaCreate", "SeoPtimer", "PicMonkey",
    "WriteSonic", "Design.Ai", "Prezi", "You.com", "Turnitin",
    "Coursera Plus", "Jasper AI", "Perplexity AI", "LongTailPro", "Word.ai"
  ];

  return (
    <section id="pricing" className="py-10 lg:py-16 relative overflow-hidden bg-white">
      {/* Background Accents */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-purple-50 text-[#2b0d66] border border-purple-200 shadow-sm mx-auto">
            <Crown className="w-4 h-4 text-purple-600" />
            Pricing Plans
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b0d66] to-purple-500">Perfect Plan</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get premium tools at a fraction of the original cost. Perfect for students, bloggers, and scaling agencies.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-start">
          
          {/* Student Plan */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(43,13,102,0.12)] transition-all duration-500 overflow-hidden group">
            <div className="p-8 lg:p-10">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <MonitorSmartphone className="w-7 h-7 text-[#2b0d66]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Student Plan</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Essential tools for beginners.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl lg:text-5xl font-black text-gray-900">1199</span>
                <span className="text-lg font-bold text-gray-400">PKR</span>
                <span className="text-sm font-medium text-gray-500 ml-1">/mo</span>
              </div>
              
              <button className="w-full py-4 px-6 rounded-xl font-bold text-[#2b0d66] bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200 transition-all duration-300 mb-8 flex items-center justify-center gap-2">
                Get Started
                <Zap className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">What's included</p>
                {(showAllStudent ? studentTools : studentTools.slice(0, 8)).map((tool) => (
                  <div key={tool} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600 font-bold" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{tool}</span>
                  </div>
                ))}
              </div>
              
              {studentTools.length > 8 && (
                <button
                  onClick={() => setShowAllStudent(!showAllStudent)}
                  className="w-full mt-6 py-2 flex items-center justify-center gap-1.5 text-sm font-bold text-[#2b0d66] hover:text-purple-600 transition-colors"
                >
                  {showAllStudent ? (
                    <><ChevronUp className="w-4 h-4" /> Show Less</>
                  ) : (
                    <><ChevronDown className="w-4 h-4" /> See {studentTools.length - 8} more tools</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Agency Plan - Featured */}
          <div className="relative transform md:-translate-y-4">
            <div className="absolute -top-5 inset-x-0 flex justify-center z-20">
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Most Popular
              </span>
            </div>
            <div className="bg-gradient-to-b from-[#2b0d66] to-[#1e0947] rounded-[2rem] shadow-[0_20px_50px_rgb(43,13,102,0.3)] transition-all duration-500 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://ansaritools.com/assets/grid.svg')] opacity-[0.05]"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
              
              <div className="p-8 lg:p-10 relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Agency Plan</h3>
                <p className="text-sm text-purple-200 mb-6 font-medium">Ultimate power for pros.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl lg:text-5xl font-black text-white">2999</span>
                  <span className="text-lg font-bold text-purple-300">PKR</span>
                  <span className="text-sm font-medium text-purple-300 ml-1">/mo</span>
                </div>
                
                <button className="w-full py-4 px-6 rounded-xl font-bold text-[#2b0d66] bg-white hover:bg-purple-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mb-8 flex items-center justify-center gap-2">
                  Get Started
                  <Zap className="w-4 h-4" />
                </button>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">Everything in Student, plus</p>
                  {(showAllAgency ? agencyTools : agencyTools.slice(0, 8)).map((tool) => (
                    <div key={tool} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-300 font-bold" />
                      </div>
                      <span className="text-sm font-semibold text-white/90">{tool}</span>
                    </div>
                  ))}
                </div>
                
                {agencyTools.length > 8 && (
                  <button
                    onClick={() => setShowAllAgency(!showAllAgency)}
                    className="w-full mt-6 py-2 flex items-center justify-center gap-1.5 text-sm font-bold text-purple-200 hover:text-white transition-colors"
                  >
                    {showAllAgency ? (
                      <><ChevronUp className="w-4 h-4" /> Show Less</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" /> See {agencyTools.length - 8} more tools</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Blogging Plan */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(43,13,102,0.12)] transition-all duration-500 overflow-hidden group">
            <div className="p-8 lg:p-10">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Star className="w-7 h-7 text-[#2b0d66]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Blogging Plan</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Perfect for content creators.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl lg:text-5xl font-black text-gray-900">1999</span>
                <span className="text-lg font-bold text-gray-400">PKR</span>
                <span className="text-sm font-medium text-gray-500 ml-1">/mo</span>
              </div>
              
              <button className="w-full py-4 px-6 rounded-xl font-bold text-[#2b0d66] bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200 transition-all duration-300 mb-8 flex items-center justify-center gap-2">
                Get Started
                <Zap className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">What's included</p>
                {(showAllBlogging ? bloggingTools : bloggingTools.slice(0, 8)).map((tool) => (
                  <div key={tool} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600 font-bold" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{tool}</span>
                  </div>
                ))}
              </div>
              
              {bloggingTools.length > 8 && (
                <button
                  onClick={() => setShowAllBlogging(!showAllBlogging)}
                  className="w-full mt-6 py-2 flex items-center justify-center gap-1.5 text-sm font-bold text-[#2b0d66] hover:text-purple-600 transition-colors"
                >
                  {showAllBlogging ? (
                    <><ChevronUp className="w-4 h-4" /> Show Less</>
                  ) : (
                    <><ChevronDown className="w-4 h-4" /> See {bloggingTools.length - 8} more tools</>
                  )}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingComponent;
