import React, { useState } from "react";
import {
  DollarSign,
  ShieldCheck,
  Headphones,
  RefreshCcw,
  Zap,
  Shield,
  ArrowRight,
  Video,
  Search,
  PenTool,
  Palette,
  Image,
  Star,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

/* --------------------------- Header --------------------------- */
const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/logo.png" alt="Ansari Tools" />
            <a href="/index.html">ANSARI TOOLS</a>
          </div>

          <button
            className={`mobile-menu-toggle${open ? " open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={open ? "open" : undefined}>
            <ul className="nav-list" onClick={() => setOpen(false)}>
              <li>
                <a href="/index.html">Home</a>
              </li>
              <li>
                <a href="/products.html">Products</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#tools">Tools</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <div className="mobile-login-buttons">
                <a href="/login.html" className="login-btn btn-outline">
                  Login
                </a>
                {/* <a href="/signup.html" class="btn btn-primary">Sign Up</a> */}
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

/* ---------------------------- Hero ---------------------------- */
const Hero = () => (
  <section className="hero">
    <div className="container">
      <div className="hero-content">
        <h1>
          Premium Digital Tools
          <br />
          At Unbeatable Prices
        </h1>
        <p>
          Access premium AI tools like ChatGPT, Canva Pro, SEMrush, Moz,
          Ubersuggest, Leonardo Ai and more at affordable subscription plans.
        </p>
        <div className="hero-buttons">
          <a href="#pricing" className="btn btn-primary">
            Get Started
          </a>
          <a href="#tools" className="btn btn-outline">
            View Tools
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* --------------------------- Pricing -------------------------- */
const Pricing = () => (
  <section id="pricing" className="pricing">
    <div className="container">
      <h2 className="section-title">Choose Your Perfect Plan</h2>
      <div className="pricing-cards">
        {/* Student Plan */}
        <div className="pricing-card">
          <div className="card-header">
            <h3>Student Plan</h3>
            <div className="price">1199 PKR</div>
            <p>per month</p>
          </div>
          <div className="card-body">
            <ul className="features-list">
              <li>
                <Check className="w-10 h-4 text-gray" /> Semrush
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Mozz Pro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> UbberSuggest
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Quillbot Premium
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Canva Pro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Grammarly
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> WordTune
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> VistaCreate
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> SeoPtimer
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> PicMonkey
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <a href="#" className="btn btn-outline">
              Get Started
            </a>
          </div>
        </div>

        {/* Blogging Plan */}
        <div className="pricing-card featured">
          <div className="card-header">
            <h3>Blogging Plan</h3>
            <div className="price">1799 PKR</div>
            <p>per month</p>
          </div>
          <div className="card-body">
            <ul className="features-list">
              <li>
                <Check className="w-10 h-4 text-gray" /> Semrush
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Mozz Pro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> UbberSuggest
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Quillbot Premium
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Canva Pro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Grammarly
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> WordTune
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> VistaCreate
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> SeoPtimer
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> PicMonkey
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> WriteSonic
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Design.Ai
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Prezi
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> You.com
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Turnitin Student
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Coursera Plus
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Jasper AI
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Perplexity AI
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> LongTailPro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Word.ai
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <a href="#" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>

        {/* Agency Plan */}
        <div className="pricing-card">
          <div className="card-header">
            <h3>Agency Plan</h3>
            <div className="price">2399 PKR</div>
            <p>per month</p>
          </div>
          <div className="card-body">
            <ul className="features-list">
              <li>
                <Check className="w-10 h-4 text-gray" /> Semrush
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Mozz Pro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> UbberSuggest
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Quillbot Premium
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Canva Pro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Grammarly
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> WordTune
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> VistaCreate
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> SeoPtimer
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> PicMonkey
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Envato Elements
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> StoryBlock
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Viral Launch
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Viral Launch
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> VidiQ Boost Plan
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Motion Array
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Capcut Pro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> SkillShare
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Helium 10
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> PicsArt Pro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Pocdora
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Niche Scraper
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> WriteSonic
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Design.Ai
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Prezi
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> You.com
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Turnitin Student
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Coursera Plus
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Placeit Unlimited
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Jasper AI
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Perplexity AI
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> LongTailPro
              </li>
              <li>
                <Check className="w-10 h-4 text-gray" /> Word.ai
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <a href="#" className="btn btn-outline">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------- Tools Categories ------------------------- */
const ToolsCategories = () => (
  <section id="tools" className="tools-categories">
    <div className="container">
      <h2 className="section-title">Premium Tools Categories</h2>
      <div className="categories-grid">
        {/* SEO Tools */}
        <div className="category-card">
          <div className="category-icon blue">
            <Search className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h3>SEO Tools</h3>
          <ul>
            <li>Semrush</li>
            <li>Ahrefs</li>
            <li>Moz Pro</li>
            <li>Ubersuggest</li>
            <li>Surfer SEO</li>
          </ul>
          <a href="#" className="category-link">
            View All{" "}
            <ArrowRight className="w-10 h-4 text-gray-800" strokeWidth={3} />
          </a>
        </div>

        {/* AI Writing Tools */}
        <div className="category-card">
          <div className="category-icon purple">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <h3>AI Writing Tools</h3>
          <ul>
            <li>ChatGPT Plus</li>
            <li>Jasper AI</li>
            <li>Copy AI</li>
            <li>Rytr</li>
            <li>Quillbot Premium</li>
          </ul>
          <a href="#" className="category-link">
            View All{" "}
            <ArrowRight className="w-10 h-4 text-gray-800" strokeWidth={3} />
          </a>
        </div>

        {/* Design Tools */}
        <div className="category-card">
          <div className="category-icon green">
            <Palette className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h3>Design Tools</h3>
          <ul>
            <li>Canva Pro</li>
            <li>Adobe Creative Cloud</li>
            <li>VistaCreate</li>
            <li>PicMonkey</li>
            <li>Figma Pro</li>
          </ul>
          <a href="#" className="category-link">
            View All{" "}
            <ArrowRight className="w-10 h-4 text-gray-800" strokeWidth={3} />
          </a>
        </div>

        {/* AI Image Tools */}
        <div className="category-card">
          <div className="category-icon red">
            <Image className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h3>AI Image Tools</h3>
          <ul>
            <li>Midjourney</li>
            <li>DALL-E</li>
            <li>Stable Diffusion</li>
            <li>Leonardo AI</li>
            <li>Runway ML</li>
          </ul>
          <a href="#" className="category-link">
            View All{" "}
            <ArrowRight className="w-10 h-4 text-gray-800" strokeWidth={3} />
          </a>
        </div>

        {/* AI Audio Tools */}
        <div className="category-card">
          <div className="category-icon yellow">
            <Headphones className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h3>AI Audio Tools</h3>
          <ul>
            <li>ElevenLabs</li>
            <li>Descript</li>
            <li>Murf AI</li>
            <li>Play.ht</li>
            <li>Resemble AI</li>
          </ul>
          <a href="#" className="category-link">
            View All{" "}
            <ArrowRight className="w-10 h-4 text-gray-800" strokeWidth={3} />
          </a>
        </div>

        {/* AI Video Tools */}
        <div className="category-card">
          <div className="category-icon blue-light">
            <Video className="w-8 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h3>AI Video Tools</h3>
          <ul>
            <li>Synthesia</li>
            <li>Pictory</li>
            <li>InVideo AI</li>
            <li>Runway ML</li>
            <li>Descript</li>
          </ul>
          <a href="#" className="category-link">
            View All{" "}
            <ArrowRight className="w-10 h-4 text-gray-800" strokeWidth={3} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------- Why Choose Us ------------------------- */
const WhyChooseUs = () => (
  <section className="why-choose-us">
    <div className="container">
      <h2 className="section-title">Why Choose AnsariTools</h2>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon green">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3>Cost Savings</h3>
          <p>
            Save up to 90% compared to individual subscriptions for each tool
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon blue">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h3>100% Legal</h3>
          <p>All accounts are legally purchased with proper licensing</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon purple">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <h3>24/7 Support</h3>
          <p>Get help anytime with our dedicated customer support team</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon yellow">
            <RefreshCcw className="w-6 h-6 text-white" />
          </div>
          <h3>Regular Updates</h3>
          <p>We continuously add new tools to our collection</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon red">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3>Reliable Access</h3>
          <p>99.9% uptime guarantee for all tools and services</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon blue-light">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3>Privacy Focused</h3>
          <p>Your data remains private and secure with our service</p>
        </div>
      </div>

      <div className="stats-counter">
        <div className="counter-item">
          <h3 data-target="10000">10,000+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="counter-item">
          <h3 data-target="50">50+</h3>
          <p>Premium Tools</p>
        </div>
        <div className="counter-item">
          <h3 data-target="99">99.9%</h3>
          <p>Customer Satisfaction</p>
        </div>
        <div className="counter-item">
          <h3 data-target="24">24/7</h3>
          <p>Customer Support</p>
        </div>
      </div>
    </div>
  </section>
);

/* ----------------------------- CTA ------------------------------ */
const CTA = () => (
  <section className="cta">
    <div className="container">
      <h2>Ready to Access Premium Tools at Affordable Prices?</h2>
      <a href="#pricing" className="btn btn-primary">
        Get Started Today
      </a>
    </div>
  </section>
);

/* -------------------------- Testimonials ------------------------- */
const Testimonials = () => (
  <section id="testimonials" className="testimonials">
    <div className="container">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <div className="testimonial-rating flex space-x-1">
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="testimonial-text">
            "AnsariTools has been a game-changer for my business. Access to all
            these premium tools at such an affordable price has helped me scale
            my content creation and SEO efforts."
          </p>
          <div className="testimonial-author">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Customer"
            />
            <div>
              <h4>Ahmed Khan</h4>
              <p>Digital Marketer</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-rating flex space-x-1">
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="testimonial-text">
            "As a freelance designer, having access to Canva Pro, Adobe CC, and
            other design tools has saved me thousands of rupees. The customer
            service is excellent too!"
          </p>
          <div className="testimonial-author">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Customer"
            />
            <div>
              <h4>Fatima Ali</h4>
              <p>Graphic Designer</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <div className="testimonial-rating flex space-x-1">
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-6 h-4 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="testimonial-text">
            "I was skeptical at first, but AnsariTools delivered exactly what
            they promised. The AI tools have helped me create content 10x faster
            for my clients."
          </p>
          <div className="testimonial-author">
            <img
              src="https://randomuser.me/api/portraits/men/62.jpg"
              alt="Customer"
            />
            <div>
              <h4>Usman Malik</h4>
              <p>Content Creator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------ FAQ ------------------------------ */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((p) => (p === i ? null : i));

  const items = [
    {
      q: "How do I get started?",
      a: `Getting started is easy! Simply choose a subscription plan that fits your needs, complete the payment process, and you'll receive access to your tools within 24 hours via email.`,
    },
    {
      q: "How long does it take to get access?",
      a: `After your payment is confirmed, you'll receive access to your tools within 24 hours. In most cases, we deliver access much faster, often within just a few hours.`,
    },
    {
      q: "Are these shared accounts?",
      a: `No, you'll receive private accounts for each tool. These are not shared with other users, ensuring you have full access to all features without interruption.`,
    },
    {
      q: "What happens if a tool stops working?",
      a: `Our team monitors all accounts 24/7. If any tool experiences issues, we'll replace it within 24 hours. Simply contact our support team, and we'll resolve it promptly.`,
    },
    {
      q: "Can I cancel my subscription?",
      a: `Yes, you can cancel your subscription at any time. However, we do not offer refunds for partial subscription periods. Your access will continue until the end of your billing cycle.`,
    },
    {
      q: "Is there a money-back guarantee?",
      a: `Yes, we offer a 7-day money-back guarantee if you're not satisfied with our service. Contact our support team within 7 days of your purchase for a full refund.`,
    },
  ];

  return (
    <section id="faq" className="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          {items.map((it, i) => (
            <div
              className={`faq-item${openIndex === i ? " open" : ""}`}
              key={i}
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <h3>{it.q}</h3>
                <span className="faq-toggle">
                  <i
                    className={`fas ${
                      openIndex === i ? "fa-minus" : "fa-plus"
                    }`}
                  ></i>
                </span>
              </button>
              <div
                className="faq-answer"
                style={{ display: openIndex === i ? "block" : "none" }}
              >
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-cta">
          <a href="#" className="btn btn-primary">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

/* ----------------------------- Footer ---------------------------- */
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/logo.png" alt="AnsariTools Logo" />
          <p>
            Premium digital tools at unbeatable prices. Save up to 90% on your
            favorite software subscriptions.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>SITE MAP</h4>
            <ul>
              <li>
                <a href="/index.html">Home</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#tools">Tools</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>LEGAL</h4>
            <ul>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>CONTACT US</h4>
            <ul>
              <li>
                <a href="mailto:ansaritools@gmail.com">
                  ansaritools3@gmail.com
                </a>
              </li>
              <li>
                <a href="#">Live Chat</a>
              </li>
              <li>
                <a href="#">+923102204842</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Ansari Tools. All rights reserved.</p>
        <div className="social-links">
          <a href="#">
            <Facebook className="w-6 h-6 text-white" />
          </a>
          <a href="#">
            <Twitter className="w-6 h-6 text-white" />
          </a>
          <a href="https://www.instagram.com/accounts/login/?next=%2Flexorasolution%2F&source=omni_redirect">
            <Instagram className="w-6 h-6 text-white" />
          </a>
          <a href="#">
            <Linkedin className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

/* -------------------------- Page Wrapper ------------------------- */
const AnsariToolsPage = () => {
  return (
    <>
      {/* Head tags like <title>, fonts & FontAwesome CDN should be in public/index.html */}
      {/* Example (public/index.html):
        <link rel="shortcut icon" href="/images/white-logo.png" type="image/x-icon" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      */}
      <Header />
      <Hero />
      <Pricing />
      <ToolsCategories />
      <WhyChooseUs />
      <CTA />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
};

export default AnsariToolsPage;
