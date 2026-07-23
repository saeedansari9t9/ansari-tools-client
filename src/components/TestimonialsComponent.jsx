import React from "react";
import { Star, Quote, MessageCircle, Sparkles } from "lucide-react";

const TestimonialsComponent = () => (
  <section id="reviews" className="py-10 lg:py-16 relative overflow-hidden bg-white">
    
    {/* Decorative Background */}
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <div className="absolute top-10 left-[-10%] w-[30rem] h-[30rem] bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-10 right-[-10%] w-[30rem] h-[30rem] bg-indigo-100/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16 lg:mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-purple-50 text-[#2b0d66] border border-purple-200 shadow-sm mx-auto">
          <MessageCircle className="w-4 h-4 text-purple-600" />
          Customer Reviews
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b0d66] to-purple-500">Customers Say</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join thousands of satisfied professionals who have transformed their workflows with our premium tools.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            text: "AnsariTools has been a game-changer for my business. Access to all these premium tools at such an affordable price has helped me scale my content creation and SEO efforts instantly.",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "Ahmed Khan",
            role: "Digital Marketer",
          },
          {
            text: "As a freelance designer, having access to Canva Pro, Adobe CC, and other design tools has saved me thousands of rupees. The customer service is excellent too!",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            name: "Fatima Ali",
            role: "Graphic Designer",
          },
          {
            text: "I was skeptical at first, but AnsariTools delivered exactly what they promised. The AI tools have helped me create content 10x faster for my clients.",
            img: "https://randomuser.me/api/portraits/men/62.jpg",
            name: "Usman Malik",
            role: "Content Creator",
          },
        ].map((t, idx) => (
          <div key={idx} className="group relative bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(43,13,102,0.12)] transition-all duration-500 border border-gray-100 hover:-translate-y-2">
            
            <div className="absolute top-6 right-6 text-purple-100 group-hover:text-purple-200 transition-colors duration-300">
              <Quote className="w-12 h-12 rotate-180 opacity-50" />
            </div>

            <div className="flex space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#ffc107] fill-[#ffc107]" />
              ))}
            </div>
            
            <p className="text-gray-600 leading-relaxed text-base italic mb-8 relative z-10 min-h-[100px]">
              "{t.text}"
            </p>
            
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-[#2b0d66] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <img 
                  src={t.img} 
                  alt={t.name} 
                  className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" 
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">{t.name}</h4>
                <p className="text-[#2b0d66] font-medium text-sm">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 lg:mt-24 text-center">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b0d66] to-purple-500 blur-xl opacity-20 rounded-full"></div>
          <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 sm:p-10 shadow-2xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Join Our Happy Customers
              </h3>
              <p className="text-gray-600 font-medium">
                Start your journey with premium tools today and see the difference.
              </p>
            </div>
            <a href="#pricing" className="px-8 py-4 shrink-0 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-[#2b0d66] to-purple-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Get Started Now
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default TestimonialsComponent;
