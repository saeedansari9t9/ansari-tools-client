import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Crown, CheckCircle } from "lucide-react";

const HeroComponent = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
    {/* Modern Mesh Gradient / Blobs Background */}
    <div className="absolute inset-0 w-full h-full bg-[#fcfaff] z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] right-[-5%] w-[35rem] h-[35rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[25rem] h-[25rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      
      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Bottom fade to blend with the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32 pb-10 lg:pb-16 flex flex-col lg:flex-row items-center gap-16 w-full">
      
      {/* Left Column: Text */}
      <div className="w-full lg:w-[55%] text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 bg-white text-[#2b0d66] border border-purple-200 shadow-sm mx-auto lg:mx-0">
          <Crown className="w-4 h-4 text-purple-600" />
          Premium AI Tools Subscription
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.15] mb-6 tracking-tight">
          Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b0d66] to-purple-500">Premium Tools</span> <br/>
          Without The Premium Price
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          Get instant access to Canva Pro, Semrush, ChatGPT Plus, and 100+ premium digital tools at up to 90% discount. Built for creators, agencies, and students.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
          <Link to="/#pricing" className="px-8 py-4 rounded-xl font-bold text-white shadow-[0_8px_30px_rgb(43,13,102,0.25)] hover:shadow-[0_8px_30px_rgb(43,13,102,0.45)] hover:-translate-y-1 transition-all duration-300 bg-[#2b0d66] flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Get Started Now
          </Link>
          <Link to="/#tools" className="px-8 py-4 rounded-xl font-bold text-[#2b0d66] bg-white hover:bg-purple-50 border border-purple-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
            <Zap className="w-5 h-5" />
            Explore Tools
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-12 gap-y-6 border-t border-gray-200/60 pt-8">
          <div>
            <h4 className="text-3xl font-black text-gray-900">50+</h4>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Premium Tools</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
          <div>
            <h4 className="text-3xl font-black text-gray-900">10k+</h4>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Happy Users</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
          <div>
            <h4 className="text-3xl font-black text-gray-900">24/7</h4>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Instant Support</p>
          </div>
        </div>
      </div>

      {/* Right Column: Visual / Glass Card */}
      <div className="w-full lg:w-[45%] relative lg:h-[500px] flex items-center justify-center mt-12 lg:mt-0 perspective-1000">
        {/* Decorative background glow behind the card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2b0d66] to-purple-400 rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDuration: '4s' }}></div>
        
        {/* The main Glassmorphic Hero Card */}
        <div className="relative w-full max-w-[420px] rounded-3xl border border-white/60 bg-white/70 backdrop-blur-2xl shadow-2xl p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(43,13,102,0.15)]">
          
          <div className="flex items-center justify-between border-b border-gray-200/60 pb-4 mb-5">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
               <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
             </div>
             <div className="text-xs font-bold text-gray-500 bg-gray-100/80 px-3 py-1 rounded-full border border-gray-200">Ansari Tools Dashboard</div>
          </div>
          
          {/* Mockup content */}
          <div className="grid grid-cols-2 gap-4">
            {/* Tool 1 */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:shadow-md transition-shadow">
               <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-white p-0.5 border border-gray-100">
                 <img src="https://res.cloudinary.com/dxqzwplkg/image/upload/v1758722100/ansari-tools/products/ws7c3nfor6l9xjfapdhb.webp" alt="Canva Pro" className="w-full h-full object-cover rounded-xl" />
               </div>
               <div>
                 <p className="text-sm font-bold text-gray-900">Canva Pro</p>
                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Active</span>
               </div>
            </div>
            {/* Tool 2 */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:shadow-md transition-shadow">
               <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-white p-0.5 border border-gray-100">
                 <img src="https://res.cloudinary.com/dxqzwplkg/image/upload/v1758725087/ansari-tools/products/l5ipbo6cfikhptbfhmxa.jpg" alt="Semrush" className="w-full h-full object-cover rounded-xl" />
               </div>
               <div>
                 <p className="text-sm font-bold text-gray-900">Semrush Guru</p>
                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Active</span>
               </div>
            </div>
            {/* Tool 3 */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:shadow-md transition-shadow">
               <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-white p-1 border border-gray-100">
                 <img src="https://res.cloudinary.com/dxqzwplkg/image/upload/v1758837843/ansari-tools/products/ocyptcqasfk4jrkvtbll.png" alt="Grammarly" className="w-full h-full object-contain rounded-xl" />
               </div>
               <div>
                 <p className="text-sm font-bold text-gray-900">Grammarly</p>
                 <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Active</span>
               </div>
            </div>
            {/* Explore More */}
            <Link to="/#tools" className="bg-gradient-to-br from-purple-50 to-[#f0ebff] p-4 rounded-2xl border border-purple-100 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:shadow-md transition-all group">
               <div className="w-14 h-14 rounded-2xl bg-[#2b0d66] text-white flex items-center justify-center text-xl font-black shadow-md group-hover:scale-110 transition-transform">
                  +47
               </div>
               <div>
                 <p className="text-sm font-bold text-gray-900">More Tools</p>
                 <p className="text-[11px] text-[#2b0d66] font-bold mt-1 group-hover:underline">Explore All &rarr;</p>
               </div>
            </Link>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
            <div className="bg-green-100 p-2.5 rounded-full text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">Instant Access</p>
              <p className="text-sm font-black text-gray-900">Delivered via Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroComponent;
