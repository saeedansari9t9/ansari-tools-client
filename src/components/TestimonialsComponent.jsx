import React from "react";
import { Star, Quote } from "lucide-react";

const Stars = () => (
  <div className="flex space-x-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
    ))}
  </div>
);

const TestimonialsComponent = () => (
  <section id="testimonials" className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--color-light)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: 'var(--color-mid-dark)' }}>
          <Quote className="w-3 h-3 sm:w-4 sm:h-4" />
          Testimonials
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--color-dark)' }}>
          What Our Customers Say
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto" style={{ color: 'var(--color-mid-dark)' }}>
          Hear from our satisfied customers who have transformed their workflows with our premium tools
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
          <div key={t.name} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="mb-6">
              <Stars />
              <p className="text-gray-700 leading-relaxed text-lg italic">
                {t.text}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img 
                src={t.img} 
                alt={t.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-100" 
              />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                <p className="text-gray-600 font-medium">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Happy Customers
          </h3>
          <p className="text-gray-600 mb-6">
            Start your journey with premium tools today and see the difference
          </p>
          <button className=" text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-dark)' }}>
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsComponent;
