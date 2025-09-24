import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import {
  Star,
  Check,
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Shield,
  Truck,
  RefreshCw,
  Zap,
  Sparkles,
  Palette,
  Edit3,
  Mic,
  Search,
  Users,
  Briefcase,
} from "lucide-react";

// Import local images
import chatgptImage from "../assets/images/ChatGPT_logo_Square.svg.png";
import canvaImage from "../assets/images/canva-icon.webp";
import leonardoImage from "../assets/images/leonardo-ai-logo-png_seeklogo-619354.png";
import grammarlyImage from "../assets/images/grammerly.svg";
import quillbotImage from "../assets/images/quilbot.png";
import turnitinImage from "../assets/images/turnitin-logo-png_seeklogo-350067.png";
import envatoImage from "../assets/images/envato.png";
import storyblocksImage from "../assets/images/storyblocks-icon-filled-256.png";
import linkedinImage from "../assets/images/linkedin-logo.jpg";
import perplexityImage from "../assets/images/perplexity-ai.webp";
import semrushImage from "../assets/images/semrush.jpg";
import mozImage from "../assets/images/moz.png";
import ubersuggestImage from "../assets/images/ubersuggest.png";
import jungleScoutImage from "../assets/images/jungle-scout.png";
import adobeCCImage from "../assets/images/adobe-cc.png";
import ryteImage from "../assets/images/ryte.webp";
import filmoraImage from "../assets/images/Wondershare_filmora_logo.svg.png";
import nordVPNImage from "../assets/images/nord-logo.png";
import surferSEOImage from "../assets/images/surfer-seo_logo.png";
import wordtuneImage from "../assets/images/wordtune.png";
import wordAIImage from "../assets/images/Wordai-Ai-Logo-PNG-SVG-Vector.png";
import surfsharkImage from "../assets/images/surfshark_icon_146090.png";
import copymaticImage from "../assets/images/copymatic-icon-unplated.png";
import skillshareImage from "../assets/images/skillshare-square-white-logo.jpg";
import freepikImage from "../assets/images/freepik.jpg";
import copyAIImage from "../assets/images/copyailogo.webp";
import invideoImage from "../assets/images/Invideo-Ai.png";
import jasperImage from "../assets/images/jasper-ai.png";
import udemyImage from "../assets/images/udemy.jpg";
import microsoft365Image from "../assets/images/Microsoft-365.svg";
import placeitImage from "../assets/images/placeit-logo.png";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Fetch product data from API
  const { product, loading, error } = useProduct(id);

  // Fallback product data (remove this after API is working)
  const fallbackProducts = [
    {
      id: 1,
      name: "ChatGPT Pro",
      description: "Advanced AI conversations with GPT-4, faster responses, and priority access to the latest features. Perfect for professionals, students, and anyone who wants to unlock the full potential of AI assistance.",
      price: "Rs 2000",
      originalPrice: "Rs 2500",
      duration: "/month",
      icon: <Zap className="w-6 h-6" />,
      image: chatgptImage,
      badge: "Most Popular",
      rating: 4.9,
      reviews: 1250,
      hasVariants: true,
      variants: [
        {
          id: "semi-private",
          name: "Semi Private",
          price: "Rs 2000",
          originalPrice: "Rs 2500",
          priceNumber: 2000,
          duration: "/month",
          description: "Shared access with enhanced performance",
          features: [
            "GPT-4 Access with latest model updates",
            "Enhanced Performance", 
            "Faster Response Times",
            "Advanced Features",
            "Standard Support",
          ]
        },
        {
          id: "private",
          name: "Private Account", 
          price: "Rs 4500",
          originalPrice: "Rs 5000",
          priceNumber: 4500,
          duration: "/month",
          description: "Dedicated private access with maximum privacy",
          features: [
            "Dedicated GPT-4 Access",
            "Maximum Privacy & Security",
            "Fastest Response Times",
            "All Advanced Features",
            "Priority 24/7 Support",
            "Custom Instructions",
          ]
        }
      ],
      specifications: [
        { label: "Model", value: "GPT-4 Turbo" },
        { label: "Response Speed", value: "2x Faster" },
        { label: "Monthly Queries", value: "Unlimited" },
        { label: "Support", value: "Priority 24/7" },
        { label: "Updates", value: "Real-time" },
      ]
    },
    {
      id: 2,
      name: "Canva Pro",
      description: "Professional design tools with premium templates, background remover, and unlimited exports. Create stunning designs for social media, presentations, and marketing materials with ease.",
      price: "Rs 300",
      originalPrice: "Rs 400", 
      duration: "/6 months",
      icon: <Palette className="w-6 h-6" />,
      image: canvaImage,
      badge: "Best Value",
      rating: 4.8,
      reviews: 980,
      hasVariants: true,
      variants: [
        {
          id: "6-months",
          name: "6 Months Plan",
          price: "Rs 300",
          originalPrice: "Rs 400",
          priceNumber: 300,
          duration: "/6 months",
          description: "Perfect for short-term projects",
          features: [
            "100,000+ Premium Templates",
            "Magic Background Remover",
            "Magic Resize for all platforms", 
            "Brand Kit with custom colors & fonts",
            "Unlimited Cloud Storage",
            "Premium stock photos & videos",
          ]
        },
        {
          id: "1-year",
          name: "1 Year Plan",
          price: "Rs 500",
          originalPrice: "Rs 700",
          priceNumber: 500,
          duration: "/year",
          description: "Best value for long-term use",
          features: [
            "100,000+ Premium Templates",
            "Magic Background Remover", 
            "Magic Resize for all platforms",
            "Brand Kit with custom colors & fonts",
            "Unlimited Cloud Storage",
            "Premium stock photos & videos",
            "Animation & video editing tools",
            "Team collaboration features"
          ]
        }
      ],
      specifications: [
        { label: "Templates", value: "100,000+" },
        { label: "Storage", value: "Unlimited" },
        { label: "Team Members", value: "Up to 5" },
        { label: "Brand Kits", value: "Unlimited" },
        { label: "Premium Content", value: "Full Access" },
      ]
    },
     {
       id: 3,
       name: "Leonardo AI",
       description: "Generate stunning AI artwork and images with advanced models. Perfect for artists, designers, and content creators who want to create unique visuals.",
       price: "Rs 800",
       originalPrice: "Rs 1000",
       duration: "/month",
       icon: <Sparkles className="w-6 h-6" />,
       image: leonardoImage,
       badge: "AI Powered",
       rating: 4.7,
       reviews: 750,
      features: [
        "AI Image Generation with multiple models",
        "Various Art Styles and filters",
        "High Resolution output (up to 4K)",
        "Commercial License included",
        "Fast Processing speed",
        "Batch generation capabilities",
        "Custom model training",
        "API access for developers"
      ],
      specifications: [
        { label: "Models", value: "50+ AI Models" },
        { label: "Resolution", value: "Up to 4K" },
        { label: "Generation Speed", value: "10-30 seconds" },
        { label: "Monthly Credits", value: "8,500" },
        { label: "License", value: "Commercial" },
      ]
    },
     {
       id: 4,
       name: "Grammarly Premium",
       description: "Advanced writing assistance with tone detection and plagiarism checker. Improve your writing with AI-powered suggestions and style recommendations.",
       price: "Rs 350",
       originalPrice: "Rs 450",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: grammarlyImage,
       badge: "Writing Pro",
       rating: 4.6,
       reviews: 650,
      features: [
        "Advanced Grammar & Spelling Check",
        "Tone Detection and Suggestions",
        "Plagiarism Checker",
        "Writing Goals and Insights",
        "Browser Extension",
        "Desktop App for all platforms",
        "Mobile keyboard",
        "Style guide compliance"
      ],
      specifications: [
        { label: "Grammar Check", value: "Advanced AI" },
        { label: "Plagiarism DB", value: "16+ Billion Pages" },
        { label: "Tone Detection", value: "Real-time" },
        { label: "Platforms", value: "All Devices" },
        { label: "Languages", value: "English" },
      ]
    },
     {
       id: 5,
       name: "ElevenLabs Pro",
       description: "AI voice cloning and text-to-speech with realistic human voices. Create professional voiceovers and clone voices with cutting-edge AI technology.",
       price: "Rs 1800",
       originalPrice: "Rs 2200",
       duration: "/month",
       icon: <Mic className="w-6 h-6" />,
       image: storyblocksImage,
       badge: "Voice AI",
       rating: 4.8,
       reviews: 420,
      features: [
        "Voice Cloning Technology",
        "Text-to-Speech in 29 languages",
        "Professional Voice Library",
        "Real-time Voice Conversion",
        "High-quality Audio Output",
        "API Integration",
        "Custom Voice Training",
        "Commercial Usage Rights"
      ],
      specifications: [
        { label: "Voice Models", value: "1000+" },
        { label: "Languages", value: "29" },
        { label: "Audio Quality", value: "Studio Grade" },
        { label: "Characters/month", value: "100,000" },
        { label: "Voice Clones", value: "10" },
      ]
    },
     {
       id: 6,
       name: "QuillBot Premium",
       description: "AI-powered paraphrasing tool with advanced writing modes. Enhance your writing with intelligent rephrasing and grammar checking.",
       price: "Rs 350",
       originalPrice: "Rs 450",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: quillbotImage,
       badge: "Writing",
       rating: 4.5,
       reviews: 580,
      features: [
        "7 Paraphrasing Modes",
        "Unlimited Words",
        "Advanced Grammar Checker",
        "Plagiarism Checker",
        "Summarizer Tool",
        "Citation Generator",
        "Translator (30+ languages)",
        "Browser Extensions"
      ],
      specifications: [
        { label: "Paraphrasing Modes", value: "7 Advanced" },
        { label: "Word Limit", value: "Unlimited" },
        { label: "Languages", value: "30+" },
        { label: "Plagiarism Check", value: "Included" },
        { label: "Integrations", value: "MS Word, Chrome" },
      ]
    },
     {
       id: 7,
       name: "Turnitin Access",
       description: "Plagiarism detection and academic integrity solutions. Ensure originality with the most comprehensive plagiarism checking database.",
       price: "Rs 350",
       originalPrice: "Rs 450",
       duration: "/month",
       icon: <Shield className="w-6 h-6" />,
       image: turnitinImage,
       badge: "Academic",
       rating: 4.7,
       reviews: 340,
       hasVariants: true,
       variants: [
         {
           id: "student",
           name: "Student Account",
           price: "Rs 350",
           originalPrice: "Rs 450",
           priceNumber: 350,
           duration: "/month",
           description: "Perfect for students and individual use",
           features: [
             "Basic Plagiarism Detection",
             "Student Database Access",
             "Similarity Report Generation",
             "Citation Assistance",
             "Basic Writing Feedback",
           ]
         },
         {
           id: "instructor",
           name: "Instructor Account",
           price: "Rs 1800",
           originalPrice: "Rs 2200",
           priceNumber: 1800,
           duration: "/month",
           description: "Advanced features for educators and institutions",
           features: [
             "Comprehensive Plagiarism Detection",
             "Academic Database Access",
             "Similarity Report Generation",
             "Citation Assistance",
             "Grammar and Writing Feedback",
             "Peer Review Tools",
             "Grade Management",
             "Integration with LMS"
           ]
         }
       ],
      features: [
        "Comprehensive Plagiarism Detection",
        "Academic Database Access",
        "Similarity Report Generation",
        "Citation Assistance",
        "Grammar and Writing Feedback",
        "Peer Review Tools",
        "Grade Management",
        "Integration with LMS"
      ],
      specifications: [
        { label: "Database Size", value: "70+ Billion Pages" },
        { label: "Accuracy", value: "99.9%" },
        { label: "Languages", value: "30+" },
        { label: "File Formats", value: "15+ Types" },
        { label: "Checks/month", value: "Unlimited" },
      ]
    },
     {
       id: 8,
       name: "Perplexity Pro",
       description: "AI-powered research assistant with real-time information. Get accurate, up-to-date answers with source citations for all your research needs.",
       price: "Rs 4000",
       originalPrice: "Rs 5000",
       duration: "/year",
       icon: <Search className="w-6 h-6" />,
       image: perplexityImage,
       badge: "Research",
       rating: 4.6,
       reviews: 290,
      features: [
        "Real-time Web Search",
        "Source Citations",
        "GPT-4 and Claude Integration",
        "Academic Paper Access",
        "File Upload and Analysis",
        "Follow-up Questions",
        "Search History",
        "Mobile App Access"
      ],
      specifications: [
        { label: "AI Models", value: "GPT-4, Claude" },
        { label: "Sources", value: "Real-time Web" },
        { label: "Queries/day", value: "600+" },
        { label: "File Upload", value: "Unlimited" },
        { label: "Citation Style", value: "Academic" },
      ]
    },
     {
       id: 9,
       name: "LinkedIn Premium Business",
       description: "Professional networking with InMail credits and premium insights. Advance your career with enhanced networking and job search capabilities.",
       price: "Rs 8500",
       originalPrice: "Rs 10000",
       duration: "/year",
       icon: <Users className="w-6 h-6" />,
       image: linkedinImage,
       badge: "Professional",
       rating: 4.4,
       reviews: 1100,
      features: [
        "InMail Credits (15/month)",
        "Who Viewed Your Profile",
        "Advanced Search Filters",
        "Salary Insights",
        "Premium Learning Courses",
        "Applicant Insights",
        "Open Profile Feature",
        "Priority Customer Support"
      ],
      specifications: [
        { label: "InMail Credits", value: "15/month" },
        { label: "Search Results", value: "3rd degree+" },
        { label: "Profile Views", value: "90 days" },
        { label: "Learning", value: "700+ courses" },
        { label: "Insights", value: "Advanced" },
      ]
    },
     {
       id: 10,
       name: "Envato Elements",
       description: "Unlimited downloads of graphics, photos, templates and more. Access millions of creative assets for all your design and marketing needs.",
       price: "Rs 1000",
       originalPrice: "Rs 1300",
       duration: "/month",
       icon: <Briefcase className="w-6 h-6" />,
       image: envatoImage,
       badge: "Creative Assets",
       rating: 4.7,
       reviews: 870,
      features: [
        "59+ Million Creative Assets",
        "Unlimited Downloads",
        "Commercial License",
        "Stock Photos & Videos",
        "Graphics & Templates",
        "Fonts & Add-ons",
        "WordPress Themes",
        "Video Templates"
      ],
      specifications: [
        { label: "Assets", value: "59+ Million" },
        { label: "Downloads", value: "Unlimited" },
        { label: "License", value: "Commercial" },
        { label: "Categories", value: "13 Creative" },
        { label: "Updates", value: "Daily" },
       ]
     },
     {
       id: 14,
       name: "Story Blocks",
       description: "Unlimited access to stock videos, audio tracks and images for content creation. Perfect for video creators, marketers, and content developers.",
       price: "Rs 1000",
       originalPrice: "Rs 1300",
       duration: "/month",
       icon: <Briefcase className="w-6 h-6" />,
       image: storyblocksImage,
       badge: "Video Assets",
       rating: 4.6,
       reviews: 620,
       features: [
         "Unlimited Stock Videos",
         "High-Quality Audio Library",
         "Premium Images & Graphics",
         "Commercial License Included",
         "HD & 4K Video Downloads",
         "Music & Sound Effects",
         "After Effects Templates",
         "Motion Graphics Library"
       ],
       specifications: [
         { label: "Videos", value: "1M+ Stock Videos" },
         { label: "Audio", value: "100K+ Tracks" },
         { label: "Images", value: "500K+ Photos" },
         { label: "Resolution", value: "HD & 4K" },
         { label: "License", value: "Commercial" },
       ]
     },
     {
       id: 15,
       name: "Semrush Pro",
       description: "Complete SEO and digital marketing toolkit with keyword research, competitor analysis, and site audit. Perfect for digital marketers, SEO professionals, and business owners.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: semrushImage,
       badge: "SEO Tools",
       rating: 4.8,
       reviews: 1200,
       features: [
         "Keyword Research & Analysis",
         "Competitor Analysis Tools",
         "Site Audit & Technical SEO",
         "Backlink Analysis",
         "Content Marketing Tools",
         "Social Media Analytics",
         "PPC Keyword Research",
         "Rank Tracking"
       ],
       specifications: [
         { label: "Keywords", value: "Unlimited" },
         { label: "Projects", value: "Up to 40" },
         { label: "Reports", value: "5000/month" },
         { label: "API Calls", value: "10,000/day" },
         { label: "Users", value: "Up to 3" },
       ]
     },
     {
       id: 16,
       name: "Moz Pro",
       description: "Professional SEO software with domain authority tracking, keyword research, and link building tools. Essential for SEO professionals and digital agencies.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: mozImage,
       badge: "SEO Analytics",
       rating: 4.7,
       reviews: 950,
       features: [
         "Domain Authority Tracking",
         "Keyword Research Tools",
         "Link Building Analysis",
         "Local SEO Tools",
         "Site Crawl Analysis",
         "Rank Tracking",
         "MozBar Browser Extension",
         "White Label Reports"
       ],
       specifications: [
         { label: "Keywords", value: "Unlimited" },
         { label: "Crawls", value: "3000 pages" },
         { label: "Link Index", value: "40+ Billion" },
         { label: "Reports", value: "Unlimited" },
         { label: "Users", value: "Up to 5" },
       ]
     },
     {
       id: 17,
       name: "Ubersuggest Pro",
       description: "All-in-one SEO tool with keyword research, content ideas, and competitor analysis features. Great for content creators and small businesses.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: ubersuggestImage,
       badge: "SEO Research",
       rating: 4.6,
       reviews: 800,
       features: [
         "Keyword Research & Suggestions",
         "Content Ideas Generator",
         "Competitor Analysis",
         "Site Audit Tools",
         "Backlink Checker",
         "Rank Tracking",
         "Content Optimization",
         "Traffic Analytics"
       ],
       specifications: [
         { label: "Keywords", value: "Unlimited" },
         { label: "Projects", value: "Unlimited" },
         { label: "Reports", value: "Unlimited" },
         { label: "API Calls", value: "Unlimited" },
         { label: "Users", value: "Up to 3" },
       ]
     },
     {
       id: 18,
       name: "Jungle Scout",
       description: "Amazon product research and sales analytics tool for e-commerce success. Find profitable products, track competitors, and optimize your Amazon business with comprehensive data insights.",
       price: "Rs 800",
       originalPrice: "Rs 1000",
       duration: "/month",
       icon: <Briefcase className="w-6 h-6" />,
       image: jungleScoutImage,
       badge: "E-commerce",
       rating: 4.7,
       reviews: 650,
       features: [
         "Product Database with 500M+ products",
         "Sales Estimator & Revenue Tracking",
         "Keyword Research & Tracking",
         "Competitor Analysis Tools",
         "Product Tracker & Alerts",
         "Supplier Database Access",
         "Profit Calculator",
         "Chrome Extension"
       ],
       specifications: [
         { label: "Products", value: "500M+ Database" },
         { label: "Keywords", value: "Unlimited" },
         { label: "Trackers", value: "Up to 200" },
         { label: "Alerts", value: "Unlimited" },
         { label: "Users", value: "Up to 3" },
       ]
     },
     {
       id: 19,
       name: "Creative Cloud",
       description: "Complete suite of Adobe creative applications for design, photography, and video. Access all professional creative tools including Photoshop, Illustrator, Premiere Pro, and more.",
       price: "Rs 1200",
       originalPrice: "Rs 1500",
       duration: "/month",
       icon: <Palette className="w-6 h-6" />,
       image: adobeCCImage,
       badge: "Creative Suite",
       rating: 4.8,
       reviews: 2100,
       features: [
         "20+ Creative Desktop Apps",
         "100GB Cloud Storage",
         "Adobe Fonts Library",
         "Stock Photos & Videos",
         "Creative Cloud Libraries",
         "Mobile Apps Included",
         "Collaboration Tools",
         "Regular Updates"
       ],
       specifications: [
         { label: "Apps", value: "20+ Desktop" },
         { label: "Storage", value: "100GB Cloud" },
         { label: "Fonts", value: "20,000+" },
         { label: "Stock Assets", value: "Premium" },
         { label: "Users", value: "1 User" },
       ]
     },
     {
       id: 20,
       name: "Ryte",
       description: "Website optimization and SEO auditing platform for better search rankings. Comprehensive technical SEO analysis and monitoring for improved website performance.",
       price: "Rs 600",
       originalPrice: "Rs 800",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: ryteImage,
       badge: "SEO Audit",
       rating: 4.5,
       reviews: 420,
       features: [
         "Technical SEO Auditing",
         "Crawl Analysis & Monitoring",
         "Keyword Tracking & Research",
         "Content Optimization Tools",
         "Backlink Analysis",
         "Competitor Monitoring",
         "Custom Reports",
         "API Access"
       ],
       specifications: [
         { label: "Crawl Pages", value: "Unlimited" },
         { label: "Keywords", value: "Unlimited" },
         { label: "Reports", value: "Unlimited" },
         { label: "Users", value: "Up to 5" },
         { label: "API Calls", value: "10,000/month" },
       ]
     },
     {
       id: 21,
       name: "Filmora",
       description: "Professional video editing software with advanced effects and easy-to-use interface. Create stunning videos with professional-grade tools and effects.",
       price: "Rs 400",
       originalPrice: "Rs 600",
       duration: "/year",
       icon: <Mic className="w-6 h-6" />,
       image: filmoraImage,
       badge: "Video Editing",
       rating: 4.6,
       reviews: 780,
       features: [
         "4K Video Editing Support",
         "Advanced Color Correction",
         "Motion Graphics & Effects",
         "Audio Editing Tools",
         "Green Screen Effects",
         "Speed Control & Slow Motion",
         "Text & Title Animations",
         "Export to Multiple Formats"
       ],
       specifications: [
         { label: "Resolution", value: "Up to 4K" },
         { label: "Effects", value: "1000+" },
         { label: "Templates", value: "500+" },
         { label: "Formats", value: "50+ Export" },
         { label: "Platforms", value: "Windows, Mac" },
       ]
     },
     {
       id: 22,
       name: "Nord VPN",
       description: "Premium VPN service with advanced security features and global server network. Protect your privacy and access content securely from anywhere in the world.",
       price: "Rs 300",
       originalPrice: "Rs 400",
       duration: "/month",
       icon: <Shield className="w-6 h-6" />,
       image: nordVPNImage,
       badge: "Security",
       rating: 4.7,
       reviews: 1500,
       features: [
         "5400+ Servers in 60+ Countries",
         "Military-Grade Encryption",
         "No-Logs Policy",
         "Kill Switch Protection",
         "Double VPN Technology",
         "CyberSec Ad Blocker",
         "6 Simultaneous Connections",
         "24/7 Customer Support"
       ],
       specifications: [
         { label: "Servers", value: "5400+" },
         { label: "Countries", value: "60+" },
         { label: "Encryption", value: "AES-256" },
         { label: "Connections", value: "6 Simultaneous" },
         { label: "Protocols", value: "OpenVPN, IKEv2" },
       ]
     },
     {
       id: 23,
       name: "Surfer SEO",
       description: "Content optimization platform that helps create SEO-friendly content. Write content that ranks higher with AI-powered optimization suggestions.",
       price: "Rs 700",
       originalPrice: "Rs 900",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: surferSEOImage,
       badge: "Content SEO",
       rating: 4.6,
       reviews: 580,
       features: [
         "Content Editor with Real-time SEO",
         "Keyword Density Analysis",
         "Competitor Content Analysis",
         "SERP Analyzer",
         "Content Planner",
         "Keyword Research Tools",
         "Content Audit",
         "Team Collaboration"
       ],
       specifications: [
         { label: "Content Audits", value: "Unlimited" },
         { label: "Keywords", value: "Unlimited" },
         { label: "Competitors", value: "Unlimited" },
         { label: "Users", value: "Up to 5" },
         { label: "API Calls", value: "10,000/month" },
       ]
     },
     {
       id: 24,
       name: "Wordune",
       description: "AI-powered content optimization tool for better writing and SEO performance. Improve your content with intelligent suggestions and optimization.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: wordtuneImage,
       badge: "Content AI",
       rating: 4.5,
       reviews: 320,
       features: [
         "AI Writing Suggestions",
         "Tone & Style Optimization",
         "SEO Content Analysis",
         "Readability Improvements",
         "Grammar & Style Check",
         "Content Templates",
         "Team Collaboration",
         "API Integration"
       ],
       specifications: [
         { label: "Words/month", value: "Unlimited" },
         { label: "Languages", value: "25+" },
         { label: "Templates", value: "100+" },
         { label: "Users", value: "Up to 3" },
         { label: "Integrations", value: "10+" },
       ]
     },
     {
       id: 25,
       name: "Word.AI",
       description: "Advanced AI writing assistant for creating high-quality content at scale. Generate articles, blog posts, and marketing copy with AI-powered writing tools.",
       price: "Rs 400",
       originalPrice: "Rs 600",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: wordAIImage,
       badge: "AI Writing",
       rating: 4.4,
       reviews: 450,
       features: [
         "AI Article Generation",
         "Multiple Writing Styles",
         "Plagiarism Detection",
         "Content Spinning",
         "Bulk Content Creation",
         "API Access",
         "Custom Templates",
         "Multi-language Support"
       ],
       specifications: [
         { label: "Words/month", value: "100,000" },
         { label: "Languages", value: "30+" },
         { label: "Templates", value: "50+" },
         { label: "API Calls", value: "Unlimited" },
         { label: "Users", value: "1 User" },
       ]
     },
     {
       id: 26,
       name: "Shurf Shark",
       description: "Advanced SEO analysis tool with comprehensive website auditing capabilities. Monitor and improve your website's SEO performance with detailed insights.",
       price: "Rs 600",
       originalPrice: "Rs 800",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: surfsharkImage,
       badge: "SEO Analysis",
       rating: 4.3,
       reviews: 280,
       features: [
         "Website SEO Auditing",
         "Keyword Tracking & Research",
         "Backlink Analysis",
         "Competitor Monitoring",
         "Technical SEO Checks",
         "Content Analysis",
         "Custom Reports",
         "White Label Options"
       ],
       specifications: [
         { label: "Websites", value: "Unlimited" },
         { label: "Keywords", value: "Unlimited" },
         { label: "Reports", value: "Unlimited" },
         { label: "Users", value: "Up to 3" },
         { label: "API Access", value: "Included" },
       ]
     },
     {
       id: 27,
       name: "Copymatic",
       description: "AI-powered copywriting tool for creating compelling marketing content. Generate high-converting copy for ads, emails, and marketing campaigns.",
       price: "Rs 350",
       originalPrice: "Rs 500",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: copymaticImage,
       badge: "Copywriting",
       rating: 4.5,
       reviews: 620,
       features: [
         "AI Copy Generation",
         "Multiple Content Types",
         "Brand Voice Training",
         "A/B Testing Tools",
         "Content Templates",
         "Team Collaboration",
         "API Integration",
         "Performance Analytics"
       ],
       specifications: [
         { label: "Words/month", value: "50,000" },
         { label: "Templates", value: "100+" },
         { label: "Languages", value: "25+" },
         { label: "Users", value: "Up to 5" },
         { label: "Projects", value: "Unlimited" },
       ]
     },
     {
       id: 28,
       name: "Skill Share",
       description: "Online learning platform with thousands of courses on creative and business skills. Learn from industry experts with hands-on projects and community support.",
       price: "Rs 200",
       originalPrice: "Rs 300",
       duration: "/month",
       icon: <Users className="w-6 h-6" />,
       image: skillshareImage,
       badge: "Learning",
       rating: 4.6,
       reviews: 1800,
       features: [
         "30,000+ Online Classes",
         "Hands-on Projects",
         "Offline Viewing",
         "Community Features",
         "Mobile Apps",
         "Certificates of Completion",
         "Expert Instructors",
         "Creative Challenges"
       ],
       specifications: [
         { label: "Classes", value: "30,000+" },
         { label: "Categories", value: "20+" },
         { label: "Instructors", value: "8,000+" },
         { label: "Languages", value: "Multiple" },
         { label: "Devices", value: "All Platforms" },
       ]
     },
     {
       id: 29,
       name: "Freepik",
       description: "Premium graphic resources platform with millions of vectors, photos, and PSD files. Access high-quality design assets for all your creative projects.",
       price: "Rs 300",
       originalPrice: "Rs 400",
       duration: "/month",
       icon: <Palette className="w-6 h-6" />,
       image: freepikImage,
       badge: "Graphics",
       rating: 4.7,
       reviews: 1200,
       features: [
         "Millions of Premium Graphics",
         "High-Quality Stock Photos",
         "Vector Illustrations",
         "PSD Templates",
         "Icons & UI Elements",
         "Commercial License",
         "Daily New Content",
         "Advanced Search Filters"
       ],
       specifications: [
         { label: "Graphics", value: "Millions" },
         { label: "Photos", value: "10M+" },
         { label: "Vectors", value: "5M+" },
         { label: "Downloads", value: "Unlimited" },
         { label: "License", value: "Commercial" },
       ]
     },
     {
       id: 30,
       name: "Copy.AI",
       description: "AI-powered copywriting platform for creating marketing content and sales copy. Generate compelling copy for ads, emails, and social media with AI assistance.",
       price: "Rs 400",
       originalPrice: "Rs 600",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: copyAIImage,
       badge: "AI Copy",
       rating: 4.4,
       reviews: 850,
       features: [
         "90+ Copywriting Templates",
         "AI Content Generation",
         "Brand Voice Training",
         "Multi-language Support",
         "Team Collaboration",
         "API Integration",
         "Content Optimization",
         "Performance Tracking"
       ],
       specifications: [
         { label: "Templates", value: "90+" },
         { label: "Languages", value: "25+" },
         { label: "Words/month", value: "40,000" },
         { label: "Users", value: "Up to 5" },
         { label: "Projects", value: "Unlimited" },
       ]
     },
     {
       id: 31,
       name: "Helium 10",
       description: "Complete Amazon seller toolkit with keyword research, product research, and analytics. Optimize your Amazon business with comprehensive data and insights.",
       price: "Rs 900",
       originalPrice: "Rs 1200",
       duration: "/month",
       icon: <Briefcase className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=H10",
       badge: "Amazon Tools",
       rating: 4.8,
       reviews: 950,
       features: [
         "Product Research & Validation",
         "Keyword Research & Tracking",
         "Competitor Analysis",
         "Listing Optimization",
         "Inventory Management",
         "Review Management",
         "PPC Optimization",
         "Chrome Extension"
       ],
       specifications: [
         { label: "Keywords", value: "Unlimited" },
         { label: "Products", value: "500M+ Database" },
         { label: "Trackers", value: "Up to 200" },
         { label: "Users", value: "Up to 3" },
         { label: "API Calls", value: "Unlimited" },
       ]
     },
     {
       id: 32,
       name: "Creator AI",
       description: "AI-powered content creation platform for social media and marketing campaigns. Create engaging content across multiple platforms with AI assistance.",
       price: "Rs 450",
       originalPrice: "Rs 650",
       duration: "/month",
       icon: <Sparkles className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=CA",
       badge: "Content AI",
       rating: 4.3,
       reviews: 380,
       features: [
         "Social Media Content Creation",
         "AI Image Generation",
         "Video Content Tools",
         "Brand Voice Training",
         "Content Calendar",
         "Multi-platform Publishing",
         "Analytics & Insights",
         "Team Collaboration"
       ],
       specifications: [
         { label: "Content Types", value: "20+" },
         { label: "Platforms", value: "10+" },
         { label: "Images/month", value: "1,000" },
         { label: "Users", value: "Up to 5" },
         { label: "Brands", value: "Unlimited" },
       ]
     },
     {
       id: 33,
       name: "Udemy",
       description: "Online learning marketplace with courses on programming, design, business, and more. Learn new skills with expert-led video courses and hands-on projects.",
       price: "Rs 150",
       originalPrice: "Rs 250",
       duration: "/month",
       icon: <Users className="w-6 h-6" />,
       image: udemyImage,
       badge: "Education",
       rating: 4.5,
       reviews: 2500,
       features: [
         "200,000+ Online Courses",
         "Expert Instructors",
         "Lifetime Access",
         "Mobile & Desktop Apps",
         "Certificates of Completion",
         "Q&A with Instructors",
         "Hands-on Projects",
         "Offline Viewing"
       ],
       specifications: [
         { label: "Courses", value: "200,000+" },
         { label: "Instructors", value: "70,000+" },
         { label: "Students", value: "57M+" },
         { label: "Languages", value: "75+" },
         { label: "Categories", value: "15+" },
       ]
     },
     {
       id: 34,
       name: "Buss Stream",
       description: "Business streaming platform for live events, webinars, and corporate communications. Host professional live events with advanced streaming capabilities.",
       price: "Rs 800",
       originalPrice: "Rs 1000",
       duration: "/month",
       icon: <Mic className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/32CD32/FFFFFF?text=BS",
       badge: "Streaming",
       rating: 4.2,
       reviews: 180,
       features: [
         "HD Live Streaming",
         "Interactive Features",
         "Analytics Dashboard",
         "Custom Branding",
         "Multi-platform Broadcasting",
         "Recording & Playback",
         "Audience Engagement Tools",
         "API Integration"
       ],
       specifications: [
         { label: "Stream Quality", value: "Up to 4K" },
         { label: "Viewers", value: "Unlimited" },
         { label: "Duration", value: "Unlimited" },
         { label: "Storage", value: "100GB" },
         { label: "Platforms", value: "10+" },
       ]
     },
     {
       id: 35,
       name: "Article Forge",
       description: "AI-powered article writing tool that creates unique, high-quality content automatically. Generate SEO-optimized articles with minimal human input.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/D2691E/FFFFFF?text=AF",
       badge: "Auto Writing",
       rating: 4.1,
       reviews: 290,
       features: [
         "AI Article Generation",
         "SEO Optimization",
         "Multiple Languages",
         "Bulk Content Creation",
         "Plagiarism Detection",
         "Custom Writing Styles",
         "API Integration",
         "WordPress Integration"
       ],
       specifications: [
         { label: "Words/month", value: "25,000" },
         { label: "Languages", value: "7" },
         { label: "Articles", value: "Unlimited" },
         { label: "API Calls", value: "Unlimited" },
         { label: "Users", value: "1 User" },
       ]
     },
     {
       id: 36,
       name: "Office 365",
       description: "Complete Microsoft Office suite with cloud storage and collaboration features. Access Word, Excel, PowerPoint, and more with cloud integration.",
       price: "Rs 400",
       originalPrice: "Rs 600",
       duration: "/month",
       icon: <Briefcase className="w-6 h-6" />,
       image: microsoft365Image,
       badge: "Productivity",
       rating: 4.7,
       reviews: 3200,
       features: [
         "Full Office Suite Access",
         "1TB OneDrive Storage",
         "Real-time Collaboration",
         "Advanced Security Features",
         "Mobile Apps",
         "Outlook Email",
         "Teams Integration",
         "Regular Updates"
       ],
       specifications: [
         { label: "Apps", value: "Full Suite" },
         { label: "Storage", value: "1TB OneDrive" },
         { label: "Users", value: "1 User" },
         { label: "Devices", value: "5 Devices" },
         { label: "Support", value: "24/7" },
       ]
     },
     {
       id: 37,
       name: "InVideo.io",
       description: "Online video creation platform with templates, AI voiceover, and editing tools. Create professional videos without technical expertise.",
       price: "Rs 600",
       originalPrice: "Rs 800",
       duration: "/month",
       icon: <Mic className="w-6 h-6" />,
       image: invideoImage,
       badge: "Video Creation",
       rating: 4.5,
       reviews: 720,
       features: [
         "5000+ Video Templates",
         "AI Voiceover Technology",
         "Text-to-Video Creation",
         "Stock Media Library",
         "Advanced Editing Tools",
         "Team Collaboration",
         "Brand Kit Integration",
         "Multi-platform Export"
       ],
       specifications: [
         { label: "Templates", value: "5000+" },
         { label: "Resolution", value: "Up to 4K" },
         { label: "Videos/month", value: "60" },
         { label: "Users", value: "Up to 3" },
         { label: "Storage", value: "100GB" },
       ]
     },
     {
       id: 38,
       name: "Scalenut AI",
       description: "AI-powered content marketing platform for SEO-optimized content creation. Create high-ranking content with AI assistance and optimization tools.",
       price: "Rs 700",
       originalPrice: "Rs 900",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=SN",
       badge: "Content Marketing",
       rating: 4.4,
       reviews: 410,
       features: [
         "AI Content Generation",
         "SEO Content Optimization",
         "Keyword Research Tools",
         "Content Planning",
         "Competitor Analysis",
         "Team Collaboration",
         "API Integration",
         "Performance Analytics"
       ],
       specifications: [
         { label: "Words/month", value: "100,000" },
         { label: "Keywords", value: "Unlimited" },
         { label: "Projects", value: "Unlimited" },
         { label: "Users", value: "Up to 5" },
         { label: "Languages", value: "10+" },
       ]
     },
     {
       id: 39,
       name: "Jasper.AI",
       description: "Advanced AI writing assistant for marketing copy, blog posts, and content creation. Generate high-quality content with AI-powered writing tools.",
       price: "Rs 800",
       originalPrice: "Rs 1000",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: jasperImage,
       badge: "AI Writing",
       rating: 4.6,
       reviews: 1100,
       features: [
         "50+ Content Templates",
         "Brand Voice Training",
         "AI Content Generation",
         "Plagiarism Detection",
         "Team Collaboration",
         "API Integration",
         "Multi-language Support",
         "Performance Analytics"
       ],
       specifications: [
         { label: "Templates", value: "50+" },
         { label: "Words/month", value: "50,000" },
         { label: "Languages", value: "25+" },
         { label: "Users", value: "Up to 5" },
         { label: "Brands", value: "Unlimited" },
       ]
     },
     {
       id: 40,
       name: "Writesonic",
       description: "AI-powered writing platform for creating marketing copy, ads, and content. Generate compelling copy for all your marketing needs with AI assistance.",
       price: "Rs 600",
       originalPrice: "Rs 800",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=WS",
       badge: "AI Copy",
       rating: 4.5,
       reviews: 680,
       features: [
         "80+ AI Writing Templates",
         "Brand Voice Training",
         "AI Article Writer",
         "Landing Page Generator",
         "Product Description Writer",
         "Team Collaboration",
         "API Integration",
         "Multi-language Support"
       ],
       specifications: [
         { label: "Templates", value: "80+" },
         { label: "Words/month", value: "60,000" },
         { label: "Languages", value: "25+" },
         { label: "Users", value: "Up to 3" },
         { label: "Projects", value: "Unlimited" },
       ]
     },
     {
       id: 41,
       name: "Vid-IQ",
       description: "YouTube optimization tool for video SEO, analytics, and growth strategies. Optimize your YouTube channel and videos for maximum visibility and engagement.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Mic className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=VIQ",
       badge: "YouTube SEO",
       rating: 4.6,
       reviews: 890,
       features: [
         "Keyword Research for YouTube",
         "Video SEO Optimization",
         "Competitor Analysis",
         "Trending Topics Discovery",
         "Thumbnail A/B Testing",
         "Analytics Dashboard",
         "Chrome Extension",
         "Team Collaboration"
       ],
       specifications: [
         { label: "Channels", value: "Unlimited" },
         { label: "Keywords", value: "Unlimited" },
         { label: "Videos", value: "Unlimited" },
         { label: "Users", value: "Up to 3" },
         { label: "API Calls", value: "Unlimited" },
       ]
     },
     {
       id: 42,
       name: "Pictory.AI",
       description: "AI-powered video creation platform that converts text to engaging videos. Create professional videos from articles, scripts, or text content.",
       price: "Rs 700",
       originalPrice: "Rs 900",
       duration: "/month",
       icon: <Mic className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/8A2BE2/FFFFFF?text=P",
       badge: "AI Video",
       rating: 4.4,
       reviews: 520,
       features: [
         "Text-to-Video Conversion",
         "AI Voiceover Generation",
         "Stock Video Library",
         "Custom Branding",
         "Multiple Video Styles",
         "Team Collaboration",
         "API Integration",
         "Social Media Optimization"
       ],
       specifications: [
         { label: "Videos/month", value: "30" },
         { label: "Duration", value: "Up to 20 min" },
         { label: "Resolution", value: "1080p HD" },
         { label: "Users", value: "Up to 3" },
         { label: "Languages", value: "20+" },
       ]
     },
     {
       id: 43,
       name: "KW Finder",
       description: "Keyword research tool for finding low-competition, high-traffic keywords. Discover profitable keywords for your SEO and content marketing campaigns.",
       price: "Rs 400",
       originalPrice: "Rs 600",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=KWF",
       badge: "Keyword Research",
       rating: 4.5,
       reviews: 650,
       features: [
         "Keyword Difficulty Analysis",
         "Search Volume Data",
         "Competitor Keyword Research",
         "Long-tail Keyword Suggestions",
         "SERP Analysis",
         "Keyword Tracking",
         "API Integration",
         "Bulk Keyword Analysis"
       ],
       specifications: [
         { label: "Keywords", value: "Unlimited" },
         { label: "Countries", value: "150+" },
         { label: "Languages", value: "50+" },
         { label: "Users", value: "Up to 3" },
         { label: "API Calls", value: "Unlimited" },
       ]
     },
     {
       id: 44,
       name: "Woo-Rank",
       description: "Website SEO analysis and monitoring tool for improving search rankings. Track your website's SEO performance and get actionable insights.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Search className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=WR",
       badge: "SEO Monitor",
       rating: 4.3,
       reviews: 380,
       features: [
         "Website SEO Auditing",
         "Keyword Ranking Tracking",
         "Competitor Analysis",
         "Technical SEO Checks",
         "Content Analysis",
         "Custom Reports",
         "White Label Options",
         "API Integration"
       ],
       specifications: [
         { label: "Websites", value: "Unlimited" },
         { label: "Keywords", value: "Unlimited" },
         { label: "Reports", value: "Unlimited" },
         { label: "Users", value: "Up to 3" },
         { label: "API Access", value: "Included" },
       ]
     },
     {
       id: 45,
       name: "Vyond",
       description: "Professional animated video creation platform for businesses and education. Create engaging animated videos with professional templates and tools.",
       price: "Rs 1000",
       originalPrice: "Rs 1300",
       duration: "/month",
       icon: <Mic className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/FF0000/FFFFFF?text=Vyond",
       badge: "Animation",
       rating: 4.7,
       reviews: 420,
       features: [
         "Professional Animation Templates",
         "Character Customization",
         "Voice Recording & Sync",
         "Multiple Video Styles",
         "Team Collaboration",
         "Brand Kit Integration",
         "HD Video Export",
         "Mobile App"
       ],
       specifications: [
         { label: "Templates", value: "1000+" },
         { label: "Characters", value: "500+" },
         { label: "Duration", value: "Up to 10 min" },
         { label: "Users", value: "Up to 5" },
         { label: "Resolution", value: "1080p HD" },
       ]
     },
     {
       id: 46,
       name: "Place It",
       description: "Mockup and design platform for creating professional product presentations. Showcase your designs with realistic mockups and templates.",
       price: "Rs 300",
       originalPrice: "Rs 400",
       duration: "/month",
       icon: <Palette className="w-6 h-6" />,
       image: placeitImage,
       badge: "Mockups",
       rating: 4.6,
       reviews: 580,
       features: [
         "5000+ Mockup Templates",
         "Custom Branding",
         "High-Resolution Downloads",
         "Multiple Device Mockups",
         "Video Mockups",
         "Logo Mockups",
         "Team Collaboration",
         "API Integration"
       ],
       specifications: [
         { label: "Mockups", value: "5000+" },
         { label: "Resolution", value: "Up to 4K" },
         { label: "Downloads", value: "Unlimited" },
         { label: "Users", value: "Up to 3" },
         { label: "Formats", value: "PNG, JPG, PDF" },
       ]
     },
     {
       id: 47,
       name: "Texta.AI",
       description: "AI-powered content generation platform for blogs, articles, and marketing copy. Create high-quality content with advanced AI writing tools.",
       price: "Rs 350",
       originalPrice: "Rs 500",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=Texta",
       badge: "Content AI",
       rating: 4.2,
       reviews: 320,
       features: [
         "AI Article Generation",
         "Blog Post Creation",
         "Marketing Copy Writing",
         "SEO Optimization",
         "Multiple Languages",
         "Content Templates",
         "API Integration",
         "Team Collaboration"
       ],
       specifications: [
         { label: "Words/month", value: "25,000" },
         { label: "Languages", value: "15+" },
         { label: "Templates", value: "50+" },
         { label: "Users", value: "Up to 3" },
         { label: "Projects", value: "Unlimited" },
       ]
     },
     {
       id: 48,
       name: "Wordhero",
       description: "AI writing assistant for creating long-form content, articles, and blog posts. Generate comprehensive content with AI-powered writing tools.",
       price: "Rs 400",
       originalPrice: "Rs 600",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=WH",
       badge: "Long-form AI",
       rating: 4.3,
       reviews: 450,
       features: [
         "Long-form Content Creation",
         "Article Writing",
         "Blog Post Generation",
         "SEO Optimization",
         "Multiple Writing Styles",
         "Content Templates",
         "API Integration",
         "Team Collaboration"
       ],
       specifications: [
         { label: "Words/month", value: "30,000" },
         { label: "Languages", value: "20+" },
         { label: "Templates", value: "30+" },
         { label: "Users", value: "Up to 3" },
         { label: "Projects", value: "Unlimited" },
       ]
     },
     {
       id: 49,
       name: "Synthesia",
       description: "AI video creation platform that generates videos with virtual presenters. Create professional videos with AI avatars and voice synthesis.",
       price: "Rs 1200",
       originalPrice: "Rs 1500",
       duration: "/month",
       icon: <Mic className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=S",
       badge: "AI Presenters",
       rating: 4.8,
       reviews: 680,
       features: [
         "AI Avatar Presenters",
         "Text-to-Speech in 120+ Languages",
         "Custom Avatar Creation",
         "Video Templates",
         "Screen Recording",
         "Team Collaboration",
         "API Integration",
         "HD Video Export"
       ],
       specifications: [
         { label: "Avatars", value: "140+" },
         { label: "Languages", value: "120+" },
         { label: "Videos/month", value: "10" },
         { label: "Duration", value: "Up to 10 min" },
         { label: "Resolution", value: "1080p HD" },
       ]
     },
     {
       id: 50,
       name: "Mid Journey",
       description: "AI image generation platform for creating stunning artwork and visuals. Generate unique images with advanced AI art models.",
       price: "Rs 600",
       originalPrice: "Rs 800",
       duration: "/month",
       icon: <Palette className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/32CD32/FFFFFF?text=MJ",
       badge: "AI Art",
       rating: 4.9,
       reviews: 1500,
       features: [
         "Advanced AI Art Generation",
         "Multiple Art Styles",
         "High-Resolution Images",
         "Commercial License",
         "Discord Community",
         "Custom Prompts",
         "Batch Generation",
         "API Access"
       ],
       specifications: [
         { label: "Images/month", value: "200" },
         { label: "Resolution", value: "Up to 4K" },
         { label: "Styles", value: "Unlimited" },
         { label: "License", value: "Commercial" },
         { label: "Generation Time", value: "1-2 minutes" },
       ]
     },
     {
       id: 51,
       name: "Closer Copy",
       description: "AI-powered copywriting tool for creating high-converting sales copy and ads. Generate persuasive copy that drives conversions and sales.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Edit3 className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=CC",
       badge: "Sales Copy",
       rating: 4.4,
       reviews: 380,
       features: [
         "Sales Copy Templates",
         "A/B Testing Tools",
         "Conversion Optimization",
         "Email Marketing Copy",
         "Ad Copy Generation",
         "Landing Page Copy",
         "Team Collaboration",
         "Performance Analytics"
       ],
       specifications: [
         { label: "Templates", value: "100+" },
         { label: "Words/month", value: "40,000" },
         { label: "Languages", value: "20+" },
         { label: "Users", value: "Up to 3" },
         { label: "Projects", value: "Unlimited" },
       ]
     },
     {
       id: 52,
       name: "Zoom Pro",
       description: "Professional video conferencing platform with advanced features and recording. Host meetings, webinars, and events with professional tools.",
       price: "Rs 800",
       originalPrice: "Rs 1000",
       duration: "/month",
       icon: <Mic className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=Z",
       badge: "Video Calls",
       rating: 4.7,
       reviews: 2800,
       features: [
         "HD Video & Audio",
         "Screen Sharing & Recording",
         "Webinar Hosting",
         "Breakout Rooms",
         "Polling & Q&A",
         "Cloud Storage",
         "Mobile Apps",
         "Integration with 1000+ Apps"
       ],
       specifications: [
         { label: "Participants", value: "Up to 100" },
         { label: "Duration", value: "Unlimited" },
         { label: "Recording", value: "5GB Cloud" },
         { label: "Users", value: "Up to 3" },
         { label: "Support", value: "24/7" },
       ]
     },
     {
       id: 53,
       name: "Elementor Pro",
       description: "Advanced WordPress page builder with professional templates and widgets. Create stunning websites without coding knowledge.",
       price: "Rs 400",
       originalPrice: "Rs 600",
       duration: "/year",
       icon: <Palette className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/FF0000/FFFFFF?text=EP",
       badge: "Page Builder",
       rating: 4.8,
       reviews: 1200,
       features: [
         "Drag & Drop Page Builder",
         "300+ Professional Templates",
         "Advanced Widgets",
         "Theme Builder",
         "WooCommerce Integration",
         "Pop-up Builder",
         "Form Builder",
         "White Label Options"
       ],
       specifications: [
         { label: "Templates", value: "300+" },
         { label: "Widgets", value: "100+" },
         { label: "Sites", value: "Unlimited" },
         { label: "Users", value: "Up to 3" },
         { label: "Support", value: "1 Year" },
       ]
     },
     {
       id: 54,
       name: "WordPress",
       description: "Complete WordPress hosting and management solution with premium themes. Get professional WordPress hosting with premium themes and plugins.",
       price: "Rs 300",
       originalPrice: "Rs 400",
       duration: "/month",
       icon: <Briefcase className="w-6 h-6" />,
       image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=WP",
       badge: "CMS",
       rating: 4.6,
       reviews: 2500,
       features: [
         "WordPress Hosting",
         "Premium Themes",
         "Essential Plugins",
         "SSL Certificate",
         "Daily Backups",
         "24/7 Support",
         "Performance Optimization",
         "Security Monitoring"
       ],
       specifications: [
         { label: "Storage", value: "20GB SSD" },
         { label: "Bandwidth", value: "Unlimited" },
         { label: "Themes", value: "50+ Premium" },
         { label: "Plugins", value: "20+ Essential" },
         { label: "Support", value: "24/7" },
       ]
     },
     {
       id: 55,
       name: "Leonardo AI",
       description: "AI-powered image generation and editing platform for creative professionals. Create stunning images with advanced AI models and editing tools.",
       price: "Rs 500",
       originalPrice: "Rs 700",
       duration: "/month",
       icon: <Palette className="w-6 h-6" />,
       image: leonardoImage,
       badge: "AI Art",
       rating: 4.7,
       reviews: 890,
       features: [
         "AI Image Generation",
         "Multiple Art Styles",
         "Image Editing Tools",
         "High-Resolution Output",
         "Commercial License",
         "API Integration",
         "Team Collaboration",
         "Custom Model Training"
       ],
       specifications: [
         { label: "Images/month", value: "8,500" },
         { label: "Resolution", value: "Up to 4K" },
         { label: "Models", value: "50+" },
         { label: "Users", value: "Up to 3" },
         { label: "License", value: "Commercial" },
       ]
     },
   ];

  // Use API product or fallback to hardcoded data
  const currentProduct = product || fallbackProducts.find(p => p.id === parseInt(id));

  // Initialize selected variant to first variant if product has variants
  React.useEffect(() => {
    if (currentProduct && currentProduct.hasVariants && currentProduct.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(currentProduct.variants[0]);
    }
  }, [currentProduct, selectedVariant]);

  // Get current product data (either base product or selected variant)
  const displayProduct = selectedVariant || currentProduct;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading Product...</h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/product')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/product')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleGetStarted = () => {
    const phoneNumber = "+923102204842";
    const productName = selectedVariant ? `${currentProduct.name} - ${selectedVariant.name}` : currentProduct.name;
    const message = `Hello! I'm interested in purchasing ${productName}. Can you please provide me with more details and help me get started?`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => navigate('/product')}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-white border-2 border-gray-100">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badge & Rating */}
              <div className="flex items-center justify-between">
                <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {currentProduct.badge}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900">{currentProduct.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(currentProduct.rating) ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{currentProduct.rating}</span>
                <span className="text-gray-600">({currentProduct.reviews} reviews)</span>
              </div>

               {/* Description */}
               <p className="text-gray-600 leading-relaxed">{currentProduct.description}</p>

              {/* Variant Selector */}
              {currentProduct.hasVariants && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Choose Plan</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {currentProduct.variants.map((variant) => (
                      <div
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedVariant?.id === variant.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{variant.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{variant.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg font-bold text-gray-900">{variant.price}</span>
                              <span className="text-sm text-gray-500 line-through">{variant.originalPrice}</span>
                            </div>
                            <span className="text-xs text-gray-500">{variant.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">{displayProduct.price}</span>
                  <span className="text-xl text-gray-500 line-through">{displayProduct.originalPrice}</span>
                  <span className="text-lg text-gray-600">{displayProduct.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                    {Math.round((1 - parseInt(displayProduct.price.replace('Rs ', '')) / parseInt(displayProduct.originalPrice.replace('Rs ', ''))) * 100)}% OFF
                  </span>
                  <span className="text-green-600 text-sm font-semibold">Limited Time Offer</span>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleGetStarted}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Instant Access</span>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">30-Day Refund</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                <div className="space-y-4">
                  {(selectedVariant?.features || currentProduct.features || []).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
                <div className="space-y-4">
                  {currentProduct.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">{spec.label}</span>
                      <span className="text-gray-900 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
