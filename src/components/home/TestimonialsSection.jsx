import React from "react";
import { Star, CheckCircle, Quote, MessageSquare } from "lucide-react";
import { useReveal, useCardSheen } from "./useHomeMotion";
import { SectionHead } from "./PricingSection";

const REVIEWS = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Digital Marketing Director",
    location: "Lahore",
    tools: ["Semrush", "Canva Pro", "Moz"],
    rating: 5,
    text: "Ansari Tools has been instrumental in keeping our marketing overheads lean. Having guaranteed private access to Semrush and Canva Pro with zero disruptions allows us to deliver high-tier audits for overseas clients without paying exorbitant monthly fees.",
  },
  {
    id: 2,
    name: "Bilal Siddiqui",
    role: "Freelance UI/UX & Motion Designer",
    location: "Karachi",
    tools: ["Envato Elements", "CapCut Pro", "Adobe CC"],
    rating: 5,
    text: "As a solo freelancer, paying $200+ each month for individual subscriptions was impossible. With Ansari Tools, I have Envato and CapCut Pro working smoothly on all my client projects. Delivered in under 2 hours.",
  },
  {
    id: 3,
    name: "Usman Tariq",
    role: "SEO & Content Strategist",
    location: "Islamabad",
    tools: ["Semrush Guru", "Jasper AI", "Quillbot"],
    rating: 5,
    text: "Private accounts are the real difference here. With other sellers on the market, logins get kicked out every 3 days. Ansari Tools delivers real, reliable credentials, and their WhatsApp support is genuinely helpful.",
  },
  {
    id: 4,
    name: "Ayesha Farooq",
    role: "Amazon FBA Seller & Consultant",
    location: "Sialkot",
    tools: ["Helium 10", "Jungle Scout"],
    rating: 5,
    text: "Helium 10 and Jungle Scout worked right out of the box. Super easy activation and whenever I had a question about Chrome extensions, they guided me step-by-step on WhatsApp within minutes.",
  },
  {
    id: 5,
    name: "Hamza Malik",
    role: "Short-form Video Specialist",
    location: "Rawalpindi",
    tools: ["CapCut Pro", "Motion Array"],
    rating: 5,
    text: "The 4K export and auto-captioning on CapCut Pro along with Motion Array templates accelerated my production speed tenfold. Worth every single rupee of the subscription.",
  },
  {
    id: 6,
    name: "Zainab Raza",
    role: "Academic Researcher & Writer",
    location: "Multan",
    tools: ["Quillbot Premium", "Turnitin", "Grammarly"],
    rating: 5,
    text: "Quillbot's unlimited paraphrasing and Grammarly Premium have saved countless hours during dissertation drafts. 100% recommended for every student and professional researcher.",
  },
];

const TestimonialsSection = () => {
  const revealRef = useReveal({ selector: ".review-card", stagger: 0.08, y: 35 });
  const sheenRef = useCardSheen();

  return (
    <section id="reviews" className="ht-section relative overflow-hidden py-20 sm:py-28">
      {/* Background glow */}
      <div
        className="ht-glow"
        style={{
          top: "20%",
          right: "-5%",
          width: "38rem",
          height: "38rem",
          background: "rgba(124,58,237,0.16)",
        }}
      />
      <div className="ht-grid" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          index="05"
          kicker="Social Proof"
          title="Endorsed by working professionals"
          copy="Over 10,000 freelancers, agencies, students, and businesses rely on Ansari Tools for their daily operational software."
        />

        {/* Rating summary bar */}
        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 border-b border-white/[0.07] pb-6">
          <div className="flex items-center gap-1.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[13px] font-semibold text-white">
            4.9 / 5.0 Rating Average
          </span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span className="ht-label text-[11px] text-[#9c92b8]">
            Verified Buyer Reviews & WhatsApp Feedbacks
          </span>
        </div>

        {/* Reviews Grid */}
        <div
          ref={revealRef}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <div ref={sheenRef} className="contents">
            {REVIEWS.map((review) => (
              <article
                key={review.id}
                className="review-card ht-card group flex flex-col justify-between overflow-hidden p-6 sm:p-7"
              >
                <div className="ht-card__sheen" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="ht-label inline-flex items-center gap-1 text-[10px] text-emerald-400">
                      <CheckCircle className="h-3 w-3" />
                      Verified Order
                    </span>
                  </div>

                  <p className="mt-5 text-[13.5px] leading-relaxed text-[#c4b5fd]/90">
                    "{review.text}"
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {review.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-0.5 text-[11px] text-[#9c92b8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-6 border-t border-white/[0.07] pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] font-bold text-white">
                        {review.name}
                      </h4>
                      <p className="text-[12px] text-[#9c92b8]">
                        {review.role} • {review.location}
                      </p>
                    </div>
                    <Quote className="h-6 w-6 text-white/10" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
