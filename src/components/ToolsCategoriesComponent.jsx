import React from "react";
import { Search, PenTool, Palette, Image as ImageIcon, Headphones, Video, ArrowRight } from "lucide-react";

const CategoryCard = ({ color, icon, title, items }) => (
  <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${color}`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-200">
      {title}
    </h3>
    <ul className="space-y-3 mb-8">
      {items.map((it) => (
        <li key={it} className="text-gray-600 font-medium flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          {it}
        </li>
      ))}
    </ul>
    <a 
      href="#" 
      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 group-hover:gap-3"
    >
      View All <ArrowRight className="w-5 h-5" strokeWidth={3} />
    </a>
  </div>
);

const ToolsCategoriesComponent = () => (
  <section id="tools" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Search className="w-4 h-4" />
          Tool Categories
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
          Premium Tools Categories
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive collection of premium tools organized by category
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CategoryCard
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          title="SEO Tools"
          icon={<Search className="w-8 h-8 text-white" strokeWidth={2.5} />}
          items={["Semrush","Ahrefs","Moz Pro","Ubersuggest","Surfer SEO"]}
        />
        <CategoryCard
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          title="AI Writing Tools"
          icon={<PenTool className="w-8 h-8 text-white" />}
          items={["ChatGPT Plus","Jasper AI","Copy AI","Rytr","Quillbot Premium"]}
        />
        <CategoryCard
          color="bg-gradient-to-r from-green-500 to-green-600"
          title="Design Tools"
          icon={<Palette className="w-8 h-8 text-white" strokeWidth={2.5} />}
          items={["Canva Pro","Adobe Creative Cloud","VistaCreate","PicMonkey","Figma Pro"]}
        />
        <CategoryCard
          color="bg-gradient-to-r from-red-500 to-red-600"
          title="AI Image Tools"
          icon={<ImageIcon className="w-8 h-8 text-white" strokeWidth={2.5} />}
          items={["Midjourney","DALL-E","Stable Diffusion","Leonardo AI","Runway ML"]}
        />
        <CategoryCard
          color="bg-gradient-to-r from-yellow-500 to-orange-500"
          title="AI Audio Tools"
          icon={<Headphones className="w-8 h-8 text-white" strokeWidth={2.5} />}
          items={["ElevenLabs","Descript","Murf AI","Play.ht","Resemble AI"]}
        />
        <CategoryCard
          color="bg-gradient-to-r from-cyan-500 to-blue-500"
          title="AI Video Tools"
          icon={<Video className="w-8 h-8 text-white" strokeWidth={2.5} />}
          items={["Synthesia","Pictory","InVideo AI","Runway ML","Descript"]}
        />
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Access All These Tools?
          </h3>
          <p className="text-gray-600 mb-6">
            Get unlimited access to all premium tools with our affordable subscription plans
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
            View All Tools
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default ToolsCategoriesComponent;
