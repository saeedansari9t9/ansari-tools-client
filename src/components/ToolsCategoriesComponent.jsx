import React from "react";
import { Search, PenTool, Palette, Image as ImageIcon, Headphones, Video, ArrowRight, Layers, Sparkles } from "lucide-react";

const CategoryCard = ({ icon, title, items, gradient, iconColor }) => (
  <div className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(43,13,102,0.12)] transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-1">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradient} rounded-bl-full opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500`}></div>
    
    <div className={`mb-6 ${iconColor} group-hover:rotate-6 transition-transform duration-300 inline-block`}>
      {icon}
    </div>
    
    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#2b0d66] transition-colors duration-300 relative z-10">
      {title}
    </h3>
    
    <ul className="space-y-3 mb-8 relative z-10">
      {items.map((it) => (
        <li key={it} className="text-sm font-medium text-gray-600 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          {it}
        </li>
      ))}
    </ul>
    
    <a 
      href="#tools" 
      className="inline-flex items-center gap-2 text-sm font-bold text-[#2b0d66] hover:text-purple-600 transition-colors duration-200 group-hover:gap-3 relative z-10"
    >
      View All <ArrowRight className="w-4 h-4" strokeWidth={3} />
    </a>
  </div>
);

const ToolsCategoriesComponent = () => (
  <section id="tools" className="py-10 lg:py-16 relative overflow-hidden bg-white">
    
    {/* Decorative Background */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full max-h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent opacity-50 blur-3xl z-0 pointer-events-none"></div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center mb-16 lg:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-white text-[#2b0d66] border border-purple-200 shadow-sm mx-auto">
          <Layers className="w-4 h-4 text-purple-600" />
          Tool Categories
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b0d66] to-purple-500">Premium Tools</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          From SEO to AI Design, we have organized our premium tools into categories to help you find exactly what you need.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto relative">
        <CategoryCard
          gradient="from-blue-500 to-blue-700"
          iconColor="text-blue-600"
          title="SEO Tools"
          icon={<Search className="w-10 h-10" strokeWidth={2} />}
          items={["Semrush", "Ahrefs", "Moz Pro", "Ubersuggest", "Surfer SEO"]}
        />
        <CategoryCard
          gradient="from-purple-500 to-purple-700"
          iconColor="text-purple-600"
          title="AI Writing Tools"
          icon={<PenTool className="w-10 h-10" strokeWidth={2} />}
          items={["ChatGPT Plus", "Jasper AI", "Copy AI", "Rytr", "Quillbot Premium"]}
        />
        <CategoryCard
          gradient="from-pink-500 to-rose-500"
          iconColor="text-pink-600"
          title="Design Tools"
          icon={<Palette className="w-10 h-10" strokeWidth={2} />}
          items={["Canva Pro", "Adobe Creative Cloud", "VistaCreate", "PicMonkey", "Figma Pro"]}
        />
        <CategoryCard
          gradient="from-orange-400 to-orange-600"
          iconColor="text-orange-500"
          title="AI Image Tools"
          icon={<ImageIcon className="w-10 h-10" strokeWidth={2} />}
          items={["Midjourney", "DALL-E", "Stable Diffusion", "Leonardo AI", "Runway ML"]}
        />
        <CategoryCard
          gradient="from-teal-400 to-emerald-600"
          iconColor="text-teal-600"
          title="AI Audio Tools"
          icon={<Headphones className="w-10 h-10" strokeWidth={2} />}
          items={["ElevenLabs", "Descript", "Murf AI", "Play.ht", "Resemble AI"]}
        />
        <CategoryCard
          gradient="from-[#2b0d66] to-[#4c1ba5]"
          iconColor="text-[#2b0d66]"
          title="AI Video Tools"
          icon={<Video className="w-10 h-10" strokeWidth={2} />}
          items={["Synthesia", "Pictory", "InVideo AI", "Runway ML", "Descript"]}
        />
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 lg:mt-24 text-center">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-[#2b0d66] blur-xl opacity-30 rounded-full"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 sm:p-10 shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Access All Tools?
              </h3>
              <p className="text-gray-600 font-medium">
                Get unlimited access to all premium tools with our affordable subscription plans.
              </p>
            </div>
            <a href="#pricing" className="px-8 py-4 shrink-0 rounded-xl font-bold text-white shadow-lg bg-[#2b0d66] hover:bg-[#1e0947] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              View Pricing
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default ToolsCategoriesComponent;
