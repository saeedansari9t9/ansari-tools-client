import React from "react";
import { Star, Quote } from "lucide-react";


const TestimonialsComponent = () => (
  <section id="testimonials" className="py-8 sm:py-12 lg:py-16" style={{ backgroundColor: 'var(--color-light)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium mb-3 sm:mb-4 shadow-lg" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
          <Quote className="w-3 h-3" />
          Testimonials
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--color-dark)' }}>
          What Our Customers Say
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto" style={{ color: 'var(--color-mid-dark)' }}>
          Hear from our satisfied customers who have transformed their workflows with our premium tools
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[
          {
            text: `"AnsariTools has been a game-changer for my business. Access to all these premium tools at such an affordable price has helped me scale my content creation and SEO efforts."`,
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "Ahmed Khan",
            role: "Digital Marketer",
          },
          {
            text: `"As a freelance designer, having access to Canva Pro, Adobe CC, and other design tools has saved me thousands of rupees. The customer service is excellent too!"`,
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            name: "Fatima Ali",
            role: "Graphic Designer",
          },
          {
            text: `"I was skeptical at first, but AnsariTools delivered exactly what they promised. The AI tools have helped me create content 10x faster for my clients."`,
            img: "https://randomuser.me/api/portraits/men/62.jpg",
            name: "Usman Malik",
            role: "Content Creator",
          },
        ].map((t) => (
          <div key={t.name} className="group bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="mb-4">
              <div className="flex space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base italic">
                {t.text}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img 
                src={t.img} 
                alt={t.name} 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-blue-100" 
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base">{t.name}</h4>
                <p className="text-gray-600 font-medium text-xs sm:text-sm">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-8 sm:mt-12">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-4 sm:p-6 shadow-xl max-w-3xl mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            Join Our Happy Customers
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Start your journey with premium tools today and see the difference
          </p>
          <button className="text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-sm" style={{ backgroundColor: 'var(--color-dark)' }}>
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsComponent;
