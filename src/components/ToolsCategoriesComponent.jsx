import React from "react";
import { Search, PenTool, Palette, Image as ImageIcon, Headphones, Video, ArrowRight } from "lucide-react";

const CategoryCard = ({ color, icon, title, items, iconStyle }) => (
  <div className="group bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color}`} style={iconStyle}>
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:opacity-80 transition-colors duration-200">
      {title}
    </h3>
    <ul className="space-y-2 mb-6">
      {items.map((it) => (
        <li key={it} className="text-sm text-gray-600 font-medium flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-dark)' }}></div>
          {it}
        </li>
      ))}
    </ul>
    <a 
      href="#" 
      className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-colors duration-200 group-hover:gap-3" style={{ color: 'var(--color-dark)' }}
    >
      View All <ArrowRight className="w-4 h-4" strokeWidth={3} />
    </a>
  </div>
);

const ToolsCategoriesComponent = () => (
  <section id="tools" className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--color-light)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: 'var(--color-dark)' }}>
          <Search className="w-3 h-3 sm:w-4 sm:h-4" />
          Tool Categories
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--color-dark)' }}>
          Premium Tools Categories
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive collection of premium tools organized by category
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <CategoryCard
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-dark)' }}
          title="SEO Tools"
          icon={<Search className="w-6 h-6 text-white" strokeWidth={2.5} />}
          items={["Semrush","Ahrefs","Moz Pro","Ubersuggest","Surfer SEO"]}
        />
        <CategoryCard
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-dark)' }}
          title="AI Writing Tools"
          icon={<PenTool className="w-6 h-6 text-white" />}
          items={["ChatGPT Plus","Jasper AI","Copy AI","Rytr","Quillbot Premium"]}
        />
        <CategoryCard
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-dark)' }}
          title="Design Tools"
          icon={<Palette className="w-6 h-6 text-white" strokeWidth={2.5} />}
          items={["Canva Pro","Adobe Creative Cloud","VistaCreate","PicMonkey","Figma Pro"]}
        />
        <CategoryCard
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-dark)' }}
          title="AI Image Tools"
          icon={<ImageIcon className="w-6 h-6 text-white" strokeWidth={2.5} />}
          items={["Midjourney","DALL-E","Stable Diffusion","Leonardo AI","Runway ML"]}
        />
        <CategoryCard
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-dark)' }}
          title="AI Audio Tools"
          icon={<Headphones className="w-6 h-6 text-white" strokeWidth={2.5} />}
          items={["ElevenLabs","Descript","Murf AI","Play.ht","Resemble AI"]}
        />
        <CategoryCard
          color="text-white"
          iconStyle={{ backgroundColor: 'var(--color-dark)' }}
          title="AI Video Tools"
          icon={<Video className="w-6 h-6 text-white" strokeWidth={2.5} />}
          items={["Synthesia","Pictory","InVideo AI","Runway ML","Descript"]}
        />
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-8 sm:mt-12">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-4 sm:p-6 shadow-xl max-w-3xl mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            Ready to Access All These Tools?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Get unlimited access to all premium tools with our affordable subscription plans
          </p>
          <button className="text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-dark)' }}>
            View All Tools
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default ToolsCategoriesComponent;
