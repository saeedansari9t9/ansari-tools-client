import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import {
  Star,
  Check,
  Zap,
  Sparkles,
  Palette,
  Edit3,
  Crown,
  Mic,
  Shield,
  Search,
  Users,
  Briefcase,
  ShoppingCart,
  Eye,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";

// Import local images
import chatgptImage from "../assets/images/ChatGPT_logo_Square.svg.png";
import canvaImage from "../assets/images/canva-icon.webp";
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
import leonardoImage from "../assets/images/leonardo-ai-logo-png_seeklogo-619354.png";
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

export default function ProductsComponent() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filterBy, setFilterBy] = useState({
    category: "all",
    priceRange: "all",
    rating: "all"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Fetch products from API
  const { products: apiProducts, loading, error } = useProducts();

  // WhatsApp redirect function
  const handleGetStarted = (productName) => {
    const phoneNumber = "+923102204842";
    const message = `Hello! I'm interested in purchasing ${productName}. Can you please provide me with more details and help me get started?`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Use API products or fallback to hardcoded data
  const products = useMemo(() => {
    if (apiProducts && apiProducts.length > 0) {
      return apiProducts.map(product => ({
        ...product,
        id: product._id, // Map MongoDB _id to id for compatibility
        priceNumber: parseInt(product.price.replace('Rs ', '')) || 0
      }));
    }
    
    // Fallback hardcoded products
    return [
    {
      id: 1,
      name: "ChatGPT Pro",
      description: "Advanced AI conversations with GPT-4, faster responses, and priority access",
      price: "Rs 2000",
      originalPrice: "Rs 2500", 
      priceNumber: 2000,
      duration: "/month",
      icon: <Zap className="w-6 h-6" />,
      image: chatgptImage,
      badge: "Most Popular",
      rating: 4.9,
      reviews: 1250,
      category: "AI Tools",
      hasVariants: true,
      variants: [
        {
          id: "semi-private",
          name: "Semi Private",
          price: "Rs 2000",
          originalPrice: "Rs 2500",
          priceNumber: 2000,
          duration: "/month",
          description: "Shared access with enhanced performance"
        },
        {
          id: "private",
          name: "Private Account",
          price: "Rs 4500", 
          originalPrice: "Rs 5000",
          priceNumber: 4500,
          duration: "/month",
          description: "Dedicated private access with maximum privacy"
        }
      ]
    },
    {
      id: 2,
      name: "Canva Pro",
      description: "Professional design tools with premium templates and unlimited exports",
      price: "Rs 300",
      originalPrice: "Rs 400",
      priceNumber: 300,
      duration: "/6 months",
      icon: <Palette className="w-6 h-6" />,
      image: canvaImage,
      badge: "Best Value",
      rating: 4.8,
      reviews: 980,
      category: "Design Tools",
      hasVariants: true,
      variants: [
        {
          id: "6-months",
          name: "6 Months Plan",
          price: "Rs 300",
          originalPrice: "Rs 400",
          priceNumber: 300,
          duration: "/6 months",
          description: "Perfect for short-term projects"
        },
        {
          id: "1-year",
          name: "1 Year Plan",
          price: "Rs 500",
          originalPrice: "Rs 700", 
          priceNumber: 500,
          duration: "/year",
          description: "Best value for long-term use"
        }
      ]
    },
    {
      id: 4,
      name: "Grammarly Premium",
      description: "Advanced writing assistance with tone detection and plagiarism checker",
      price: "Rs 350",
      originalPrice: "Rs 450",
      priceNumber: 350,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: grammarlyImage,
      badge: "Writing Pro",
      rating: 4.6,
      reviews: 650,
      category: "Writing Tools",
    },
    {
      id: 6,
      name: "QuillBot Premium",
      description: "AI-powered paraphrasing tool with advanced writing modes",
      price: "Rs 350",
      originalPrice: "Rs 450",
      priceNumber: 350,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: quillbotImage,
      badge: "Writing",
      rating: 4.5,
      reviews: 580,
      category: "Writing Tools",
    },
    {
      id: 7,
      name: "Turnitin Access",
      description: "Plagiarism detection and academic integrity solutions",
      price: "Rs 350",
      originalPrice: "Rs 450",
      priceNumber: 350,
      duration: "/month",
      icon: <Shield className="w-6 h-6" />,
      image: turnitinImage,
      badge: "Academic",
      rating: 4.7,
      reviews: 340,
      category: "Academic Tools",
      hasVariants: true,
      variants: [
        {
          id: "student",
          name: "Student Account",
          price: "Rs 350",
          originalPrice: "Rs 450",
          priceNumber: 350,
          duration: "/month",
          description: "Perfect for students and individual use"
        },
        {
          id: "instructor",
          name: "Instructor Account",
          price: "Rs 1800",
          originalPrice: "Rs 2200",
          priceNumber: 1800,
          duration: "/month",
          description: "Advanced features for educators and institutions"
        }
      ]
    },
    {
      id: 8,
      name: "Perplexity Pro",
      description: "AI-powered research assistant with real-time information",
      price: "Rs 4000",
      originalPrice: "Rs 5000",
      priceNumber: 4000,
      duration: "/year",
      icon: <Search className="w-6 h-6" />,
      image: perplexityImage,
      badge: "Research",
      rating: 4.6,
      reviews: 290,
      category: "AI Tools",
    },
    {
      id: 9,
      name: "LinkedIn Premium Business",
      description: "Professional networking with InMail credits and premium insights for business",
      price: "Rs 8500",
      originalPrice: "Rs 10000",
      priceNumber: 8500,
      duration: "/year",
      icon: <Users className="w-6 h-6" />,
      image: linkedinImage,
      badge: "Professional",
      rating: 4.4,
      reviews: 1100,
      category: "Professional Tools",
    },
    {
      id: 10,
      name: "Envato Elements",
      description: "Unlimited downloads of graphics, photos, templates and more",
      price: "Rs 1000",
      originalPrice: "Rs 1300",
      priceNumber: 1000,
      duration: "/month",
      icon: <Briefcase className="w-6 h-6" />,
      image: envatoImage,
      badge: "Creative Assets",
      rating: 4.7,
      reviews: 870,
      category: "Design Tools",
    },
    {
      id: 14,
      name: "Story Blocks",
      description: "Unlimited access to stock videos, audio tracks and images for content creation",
      price: "Rs 1000",
      originalPrice: "Rs 1300",
      priceNumber: 1000,
      duration: "/month",
      icon: <Briefcase className="w-6 h-6" />,
      image: storyblocksImage,
      badge: "Video Assets",
      rating: 4.6,
      reviews: 620,
      category: "Design Tools",
    },
    {
      id: 15,
      name: "Semrush Pro",
      description: "Complete SEO and digital marketing toolkit with keyword research, competitor analysis, and site audit",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: semrushImage,
      badge: "SEO Tools",
      rating: 4.8,
      reviews: 1200,
      category: "SEO Tools",
    },
    {
      id: 16,
      name: "Moz Pro",
      description: "Professional SEO software with domain authority tracking, keyword research, and link building tools",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: mozImage,
      badge: "SEO Analytics",
      rating: 4.7,
      reviews: 950,
      category: "SEO Tools",
    },
    {
      id: 17,
      name: "Ubersuggest Pro",
      description: "All-in-one SEO tool with keyword research, content ideas, and competitor analysis features",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: ubersuggestImage,
      badge: "SEO Research",
      rating: 4.6,
      reviews: 800,
      category: "SEO Tools",
    },
    {
      id: 18,
      name: "Jungle Scout",
      description: "Amazon product research and sales analytics tool for e-commerce success",
      price: "Rs 800",
      originalPrice: "Rs 1000",
      priceNumber: 800,
      duration: "/month",
      icon: <ShoppingCart className="w-6 h-6" />,
      image: jungleScoutImage,
      badge: "E-commerce",
      rating: 4.7,
      reviews: 650,
      category: "E-commerce Tools",
    },
    {
      id: 19,
      name: "Creative Cloud",
      description: "Complete suite of Adobe creative applications for design, photography, and video",
      price: "Rs 1200",
      originalPrice: "Rs 1500",
      priceNumber: 1200,
      duration: "/month",
      icon: <Palette className="w-6 h-6" />,
      image: adobeCCImage,
      badge: "Creative Suite",
      rating: 4.8,
      reviews: 2100,
      category: "Design Tools",
    },
    {
      id: 20,
      name: "Ryte",
      description: "Website optimization and SEO auditing platform for better search rankings",
      price: "Rs 600",
      originalPrice: "Rs 800",
      priceNumber: 600,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: ryteImage,
      badge: "SEO Audit",
      rating: 4.5,
      reviews: 420,
      category: "SEO Tools",
    },
    {
      id: 21,
      name: "Filmora",
      description: "Professional video editing software with advanced effects and easy-to-use interface",
      price: "Rs 400",
      originalPrice: "Rs 600",
      priceNumber: 400,
      duration: "/year",
      icon: <Mic className="w-6 h-6" />,
      image: filmoraImage,
      badge: "Video Editing",
      rating: 4.6,
      reviews: 780,
      category: "Video Tools",
    },
    {
      id: 22,
      name: "Nord VPN",
      description: "Premium VPN service with advanced security features and global server network",
      price: "Rs 300",
      originalPrice: "Rs 400",
      priceNumber: 300,
      duration: "/month",
      icon: <Shield className="w-6 h-6" />,
      image: nordVPNImage,
      badge: "Security",
      rating: 4.7,
      reviews: 1500,
      category: "Security Tools",
    },
    {
      id: 23,
      name: "Surfer SEO",
      description: "Content optimization platform that helps create SEO-friendly content",
      price: "Rs 700",
      originalPrice: "Rs 900",
      priceNumber: 700,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: surferSEOImage,
      badge: "Content SEO",
      rating: 4.6,
      reviews: 580,
      category: "SEO Tools",
    },
    {
      id: 24,
      name: "Wordune",
      description: "AI-powered content optimization tool for better writing and SEO performance",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: wordtuneImage,
      badge: "Content AI",
      rating: 4.5,
      reviews: 320,
      category: "Writing Tools",
    },
    {
      id: 25,
      name: "Word.AI",
      description: "Advanced AI writing assistant for creating high-quality content at scale",
      price: "Rs 400",
      originalPrice: "Rs 600",
      priceNumber: 400,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: wordAIImage,
      badge: "AI Writing",
      rating: 4.4,
      reviews: 450,
      category: "AI Tools",
    },
    {
      id: 26,
      name: "Shurf Shark",
      description: "Advanced SEO analysis tool with comprehensive website auditing capabilities",
      price: "Rs 600",
      originalPrice: "Rs 800",
      priceNumber: 600,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: surfsharkImage,
      badge: "SEO Analysis",
      rating: 4.3,
      reviews: 280,
      category: "SEO Tools",
    },
    {
      id: 27,
      name: "Copymatic",
      description: "AI-powered copywriting tool for creating compelling marketing content",
      price: "Rs 350",
      originalPrice: "Rs 500",
      priceNumber: 350,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: copymaticImage,
      badge: "Copywriting",
      rating: 4.5,
      reviews: 620,
      category: "Writing Tools",
    },
    {
      id: 28,
      name: "Skill Share",
      description: "Online learning platform with thousands of courses on creative and business skills",
      price: "Rs 200",
      originalPrice: "Rs 300",
      priceNumber: 200,
      duration: "/month",
      icon: <Users className="w-6 h-6" />,
      image: skillshareImage,
      badge: "Learning",
      rating: 4.6,
      reviews: 1800,
      category: "Learning Tools",
    },
    {
      id: 29,
      name: "Freepik",
      description: "Premium graphic resources platform with millions of vectors, photos, and PSD files",
      price: "Rs 300",
      originalPrice: "Rs 400",
      priceNumber: 300,
      duration: "/month",
      icon: <Palette className="w-6 h-6" />,
      image: freepikImage,
      badge: "Graphics",
      rating: 4.7,
      reviews: 1200,
      category: "Design Tools",
    },
    {
      id: 30,
      name: "Copy.AI",
      description: "AI-powered copywriting platform for creating marketing content and sales copy",
      price: "Rs 400",
      originalPrice: "Rs 600",
      priceNumber: 400,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: copyAIImage,
      badge: "AI Copy",
      rating: 4.4,
      reviews: 850,
      category: "AI Tools",
    },
    {
      id: 31,
      name: "Helium 10",
      description: "Complete Amazon seller toolkit with keyword research, product research, and analytics",
      price: "Rs 900",
      originalPrice: "Rs 1200",
      priceNumber: 900,
      duration: "/month",
      icon: <ShoppingCart className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=H10",
      badge: "Amazon Tools",
      rating: 4.8,
      reviews: 950,
      category: "E-commerce Tools",
    },
    {
      id: 32,
      name: "Creator AI",
      description: "AI-powered content creation platform for social media and marketing campaigns",
      price: "Rs 450",
      originalPrice: "Rs 650",
      priceNumber: 450,
      duration: "/month",
      icon: <Sparkles className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=CA",
      badge: "Content AI",
      rating: 4.3,
      reviews: 380,
      category: "AI Tools",
    },
    {
      id: 33,
      name: "Udemy",
      description: "Online learning marketplace with courses on programming, design, business, and more",
      price: "Rs 150",
      originalPrice: "Rs 250",
      priceNumber: 150,
      duration: "/month",
      icon: <Users className="w-6 h-6" />,
      image: udemyImage,
      badge: "Education",
      rating: 4.5,
      reviews: 2500,
      category: "Learning Tools",
    },
    {
      id: 34,
      name: "Buss Stream",
      description: "Business streaming platform for live events, webinars, and corporate communications",
      price: "Rs 800",
      originalPrice: "Rs 1000",
      priceNumber: 800,
      duration: "/month",
      icon: <Mic className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/32CD32/FFFFFF?text=BS",
      badge: "Streaming",
      rating: 4.2,
      reviews: 180,
      category: "Business Tools",
    },
    {
      id: 35,
      name: "Article Forge",
      description: "AI-powered article writing tool that creates unique, high-quality content automatically",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/D2691E/FFFFFF?text=AF",
      badge: "Auto Writing",
      rating: 4.1,
      reviews: 290,
      category: "AI Tools",
    },
    {
      id: 36,
      name: "Office 365",
      description: "Complete Microsoft Office suite with cloud storage and collaboration features",
      price: "Rs 400",
      originalPrice: "Rs 600",
      priceNumber: 400,
      duration: "/month",
      icon: <Briefcase className="w-6 h-6" />,
      image: microsoft365Image,
      badge: "Productivity",
      rating: 4.7,
      reviews: 3200,
      category: "Productivity Tools",
    },
    {
      id: 37,
      name: "InVideo.io",
      description: "Online video creation platform with templates, AI voiceover, and editing tools",
      price: "Rs 600",
      originalPrice: "Rs 800",
      priceNumber: 600,
      duration: "/month",
      icon: <Mic className="w-6 h-6" />,
      image: invideoImage,
      badge: "Video Creation",
      rating: 4.5,
      reviews: 720,
      category: "Video Tools",
    },
    {
      id: 38,
      name: "Scalenut AI",
      description: "AI-powered content marketing platform for SEO-optimized content creation",
      price: "Rs 700",
      originalPrice: "Rs 900",
      priceNumber: 700,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=SN",
      badge: "Content Marketing",
      rating: 4.4,
      reviews: 410,
      category: "Marketing Tools",
    },
    {
      id: 39,
      name: "Jasper.AI",
      description: "Advanced AI writing assistant for marketing copy, blog posts, and content creation",
      price: "Rs 800",
      originalPrice: "Rs 1000",
      priceNumber: 800,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: jasperImage,
      badge: "AI Writing",
      rating: 4.6,
      reviews: 1100,
      category: "AI Tools",
    },
    {
      id: 40,
      name: "Writesonic",
      description: "AI-powered writing platform for creating marketing copy, ads, and content",
      price: "Rs 600",
      originalPrice: "Rs 800",
      priceNumber: 600,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=WS",
      badge: "AI Copy",
      rating: 4.5,
      reviews: 680,
      category: "AI Tools",
    },
    {
      id: 41,
      name: "Vid-IQ",
      description: "YouTube optimization tool for video SEO, analytics, and growth strategies",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Mic className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=VIQ",
      badge: "YouTube SEO",
      rating: 4.6,
      reviews: 890,
      category: "Video Tools",
    },
    {
      id: 42,
      name: "Pictory.AI",
      description: "AI-powered video creation platform that converts text to engaging videos",
      price: "Rs 700",
      originalPrice: "Rs 900",
      priceNumber: 700,
      duration: "/month",
      icon: <Mic className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/8A2BE2/FFFFFF?text=P",
      badge: "AI Video",
      rating: 4.4,
      reviews: 520,
      category: "AI Tools",
    },
    {
      id: 43,
      name: "KW Finder",
      description: "Keyword research tool for finding low-competition, high-traffic keywords",
      price: "Rs 400",
      originalPrice: "Rs 600",
      priceNumber: 400,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=KWF",
      badge: "Keyword Research",
      rating: 4.5,
      reviews: 650,
      category: "SEO Tools",
    },
    {
      id: 44,
      name: "Woo-Rank",
      description: "Website SEO analysis and monitoring tool for improving search rankings",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Search className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=WR",
      badge: "SEO Monitor",
      rating: 4.3,
      reviews: 380,
      category: "SEO Tools",
    },
    {
      id: 45,
      name: "Vyond",
      description: "Professional animated video creation platform for businesses and education",
      price: "Rs 1000",
      originalPrice: "Rs 1300",
      priceNumber: 1000,
      duration: "/month",
      icon: <Mic className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/FF0000/FFFFFF?text=Vyond",
      badge: "Animation",
      rating: 4.7,
      reviews: 420,
      category: "Video Tools",
    },
    {
      id: 46,
      name: "Place It",
      description: "Mockup and design platform for creating professional product presentations",
      price: "Rs 300",
      originalPrice: "Rs 400",
      priceNumber: 300,
      duration: "/month",
      icon: <Palette className="w-6 h-6" />,
      image: placeitImage,
      badge: "Mockups",
      rating: 4.6,
      reviews: 580,
      category: "Design Tools",
    },
    {
      id: 47,
      name: "Texta.AI",
      description: "AI-powered content generation platform for blogs, articles, and marketing copy",
      price: "Rs 350",
      originalPrice: "Rs 500",
      priceNumber: 350,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=Texta",
      badge: "Content AI",
      rating: 4.2,
      reviews: 320,
      category: "AI Tools",
    },
    {
      id: 48,
      name: "Wordhero",
      description: "AI writing assistant for creating long-form content, articles, and blog posts",
      price: "Rs 400",
      originalPrice: "Rs 600",
      priceNumber: 400,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=WH",
      badge: "Long-form AI",
      rating: 4.3,
      reviews: 450,
      category: "AI Tools",
    },
    {
      id: 49,
      name: "Synthesia",
      description: "AI video creation platform that generates videos with virtual presenters",
      price: "Rs 1200",
      originalPrice: "Rs 1500",
      priceNumber: 1200,
      duration: "/month",
      icon: <Mic className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=S",
      badge: "AI Presenters",
      rating: 4.8,
      reviews: 680,
      category: "AI Tools",
    },
    {
      id: 50,
      name: "Mid Journey",
      description: "AI image generation platform for creating stunning artwork and visuals",
      price: "Rs 600",
      originalPrice: "Rs 800",
      priceNumber: 600,
      duration: "/month",
      icon: <Palette className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/32CD32/FFFFFF?text=MJ",
      badge: "AI Art",
      rating: 4.9,
      reviews: 1500,
      category: "AI Tools",
    },
    {
      id: 51,
      name: "Closer Copy",
      description: "AI-powered copywriting tool for creating high-converting sales copy and ads",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Edit3 className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=CC",
      badge: "Sales Copy",
      rating: 4.4,
      reviews: 380,
      category: "Writing Tools",
    },
    {
      id: 52,
      name: "Zoom Pro",
      description: "Professional video conferencing platform with advanced features and recording",
      price: "Rs 800",
      originalPrice: "Rs 1000",
      priceNumber: 800,
      duration: "/month",
      icon: <Mic className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=Z",
      badge: "Video Calls",
      rating: 4.7,
      reviews: 2800,
      category: "Communication Tools",
    },
    {
      id: 53,
      name: "Elementor Pro",
      description: "Advanced WordPress page builder with professional templates and widgets",
      price: "Rs 400",
      originalPrice: "Rs 600",
      priceNumber: 400,
      duration: "/year",
      icon: <Palette className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/FF0000/FFFFFF?text=EP",
      badge: "Page Builder",
      rating: 4.8,
      reviews: 1200,
      category: "Web Development",
    },
    {
      id: 54,
      name: "WordPress",
      description: "Complete WordPress hosting and management solution with premium themes",
      price: "Rs 300",
      originalPrice: "Rs 400",
      priceNumber: 300,
      duration: "/month",
      icon: <Briefcase className="w-6 h-6" />,
      image: "https://via.placeholder.com/200x200/4682B4/FFFFFF?text=WP",
      badge: "CMS",
      rating: 4.6,
      reviews: 2500,
      category: "Web Development",
    },
    {
      id: 55,
      name: "Leonardo AI",
      description: "AI-powered image generation and editing platform for creative professionals",
      price: "Rs 500",
      originalPrice: "Rs 700",
      priceNumber: 500,
      duration: "/month",
      icon: <Palette className="w-6 h-6" />,
      image: leonardoImage,
      badge: "AI Art",
      rating: 4.7,
      reviews: 890,
      category: "AI Tools",
    },
  ];
  }, [apiProducts]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = filterBy.category === "all" || product.category === filterBy.category;
      
      // Price range filter
      let matchesPrice = true;
      if (filterBy.priceRange !== "all") {
        const price = product.priceNumber;
        switch (filterBy.priceRange) {
          case "under500":
            matchesPrice = price < 500;
            break;
          case "500to2000":
            matchesPrice = price >= 500 && price <= 2000;
            break;
          case "over2000":
            matchesPrice = price > 2000;
            break;
          default:
            matchesPrice = true;
        }
      }
      
      // Rating filter
      let matchesRating = true;
      if (filterBy.rating !== "all") {
        const rating = product.rating;
        switch (filterBy.rating) {
          case "4plus":
            matchesRating = rating >= 4.0;
            break;
          case "4.5plus":
            matchesRating = rating >= 4.5;
            break;
          default:
            matchesRating = true;
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceNumber - b.priceNumber;
        case "price-high":
          return b.priceNumber - a.priceNumber;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "popular":
        default:
          return b.reviews - a.reviews;
      }
    });
    
    return filtered;
  }, [searchTerm, sortBy, filterBy, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy, sortBy]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900">Loading Products...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar - Left Side */}
            <div className="relative w-full lg:w-80">
              <div className="relative bg-gray-50 rounded-lg border border-gray-300 hover:border-gray-400 focus-within:border-blue-500 transition-all duration-200">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-transparent rounded-lg focus:outline-none placeholder-gray-500 text-gray-900 font-medium"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters and Sort - Right Side */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                      <select
                        value={filterBy.category}
                        onChange={(e) => setFilterBy({...filterBy, category: e.target.value})}
                        className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer min-w-[150px] shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <option value="all" className="font-medium">All Categories</option>
                        <option value="AI Tools" className="font-medium">AI Tools</option>
                        <option value="Design Tools" className="font-medium">Design Tools</option>
                        <option value="Writing Tools" className="font-medium">Writing Tools</option>
                        <option value="Academic Tools" className="font-medium">Academic Tools</option>
                        <option value="Professional Tools" className="font-medium">Professional Tools</option>
                        <option value="SEO Tools" className="font-medium">SEO Tools</option>
                        <option value="E-commerce Tools" className="font-medium">E-commerce Tools</option>
                        <option value="Video Tools" className="font-medium">Video Tools</option>
                        <option value="Security Tools" className="font-medium">Security Tools</option>
                        <option value="Learning Tools" className="font-medium">Learning Tools</option>
                        <option value="Business Tools" className="font-medium">Business Tools</option>
                        <option value="Productivity Tools" className="font-medium">Productivity Tools</option>
                        <option value="Marketing Tools" className="font-medium">Marketing Tools</option>
                        <option value="Communication Tools" className="font-medium">Communication Tools</option>
                        <option value="Web Development" className="font-medium">Web Development</option>
                      </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="relative">
                  <select
                    value={filterBy.priceRange}
                    onChange={(e) => setFilterBy({...filterBy, priceRange: e.target.value})}
                    className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer min-w-[130px] shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <option value="all" className="font-medium">All Prices</option>
                    <option value="under500" className="font-medium">Under Rs 500</option>
                    <option value="500to2000" className="font-medium">Rs 500 - Rs 2000</option>
                    <option value="over2000" className="font-medium">Over Rs 2000</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="relative">
                  <select
                    value={filterBy.rating}
                    onChange={(e) => setFilterBy({...filterBy, rating: e.target.value})}
                    className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer min-w-[130px] shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <option value="all" className="font-medium">All Ratings</option>
                    <option value="4plus" className="font-medium">4.0+ Stars</option>
                    <option value="4.5plus" className="font-medium">4.5+ Stars</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Clear Filters */}
                {(filterBy.category !== "all" || filterBy.priceRange !== "all" || filterBy.rating !== "all") && (
                  <button
                    onClick={() => setFilterBy({category: "all", priceRange: "all", rating: "all"})}
                    className="px-4 py-2.5 text-red-600 hover:text-white bg-white hover:bg-red-500 border-2 border-red-200 hover:border-red-500 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Sort Options */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer min-w-[160px] shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <option value="popular" className="font-medium">Most Popular</option>
                  <option value="rating" className="font-medium">Highest Rated</option>
                  <option value="price-low" className="font-medium">Price: Low to High</option>
                  <option value="price-high" className="font-medium">Price: High to Low</option>
                  <option value="name" className="font-medium">Name: A to Z</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
                Filters
                {(filterBy.category !== "all" || filterBy.priceRange !== "all" || filterBy.rating !== "all") && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">!</span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Products</h3>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filterBy.category}
                      onChange={(e) => setFilterBy({...filterBy, category: e.target.value})}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm font-medium text-gray-700 shadow-sm transition-all duration-200"
                    >
                      <option value="all" className="font-medium">All Categories</option>
                      <option value="AI Tools" className="font-medium">AI Tools</option>
                      <option value="Design Tools" className="font-medium">Design Tools</option>
                      <option value="Writing Tools" className="font-medium">Writing Tools</option>
                      <option value="Academic Tools" className="font-medium">Academic Tools</option>
                      <option value="Professional Tools" className="font-medium">Professional Tools</option>
                      <option value="SEO Tools" className="font-medium">SEO Tools</option>
                      <option value="E-commerce Tools" className="font-medium">E-commerce Tools</option>
                      <option value="Video Tools" className="font-medium">Video Tools</option>
                      <option value="Security Tools" className="font-medium">Security Tools</option>
                      <option value="Learning Tools" className="font-medium">Learning Tools</option>
                      <option value="Business Tools" className="font-medium">Business Tools</option>
                      <option value="Productivity Tools" className="font-medium">Productivity Tools</option>
                      <option value="Marketing Tools" className="font-medium">Marketing Tools</option>
                      <option value="Communication Tools" className="font-medium">Communication Tools</option>
                      <option value="Web Development" className="font-medium">Web Development</option>
                    </select>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filterBy.priceRange}
                  onChange={(e) => setFilterBy({...filterBy, priceRange: e.target.value})}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm font-medium text-gray-700 shadow-sm transition-all duration-200"
                >
                  <option value="all" className="font-medium">All Prices</option>
                  <option value="under500" className="font-medium">Under Rs 500</option>
                  <option value="500to2000" className="font-medium">Rs 500 - Rs 2000</option>
                  <option value="over2000" className="font-medium">Over Rs 2000</option>
                </select>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  value={filterBy.rating}
                  onChange={(e) => setFilterBy({...filterBy, rating: e.target.value})}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm font-medium text-gray-700 shadow-sm transition-all duration-200"
                >
                  <option value="all" className="font-medium">All Ratings</option>
                  <option value="4plus" className="font-medium">4.0+ Stars</option>
                  <option value="4.5plus" className="font-medium">4.5+ Stars</option>
                </select>
              </div>

              {/* Mobile Clear Button */}
              {(filterBy.category !== "all" || filterBy.priceRange !== "all" || filterBy.rating !== "all") && (
                <button
                  onClick={() => {
                    setFilterBy({category: "all", priceRange: "all", rating: "all"});
                    setShowFilters(false);
                  }}
                  className="w-full px-4 py-3 text-red-600 hover:text-white bg-white hover:bg-red-500 border-2 border-red-200 hover:border-red-500 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md mt-4"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>


        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer ${
                hoveredCard === product.id ? "transform -translate-y-1" : ""
              }`}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Product Image */}
              <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain bg-white p-2 sm:p-4 lg:p-3 group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              {/* Badge */}
                <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 lg:top-2.5 lg:left-2.5">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-1 py-0.5 sm:px-1.5 sm:py-0.5 lg:px-2 lg:py-1 rounded-full">
                {product.badge}
                  </span>
              </div>
                {/* Quick View Button */}
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 lg:top-2.5 lg:right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    to={`/product/${product.id}`}
                    className="bg-white/90 hover:bg-white text-gray-700 p-1 sm:p-1.5 lg:p-2 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center"
                  >
                    <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                  </Link>
                  </div>
              </Link>

              {/* Product Info */}
              <div className="p-2 sm:p-3 lg:p-2.5">
                  {/* Rating */}
                <div className="flex items-center gap-1 mb-1 sm:mb-1.5 lg:mb-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} 
                      />
                      ))}
                    </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {product.rating} ({product.reviews})
                    </span>
                  </div>

                {/* Product Name */}
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-sm sm:text-base lg:text-sm font-semibold text-gray-900 mb-1 sm:mb-1.5 lg:mb-1 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                  {/* Description */}
                <p className="text-xs sm:text-sm lg:text-xs text-gray-600 mb-1.5 sm:mb-2 lg:mb-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 sm:gap-1.5 lg:gap-1 mb-1.5 sm:mb-2 lg:mb-1.5">
                  <span className="text-sm sm:text-base lg:text-sm font-bold text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                  <span className="text-xs text-gray-500">
                        {product.duration}
                      </span>
                  </div>

                {/* Action Buttons */}
                <div className="flex gap-1 sm:gap-1.5 lg:gap-1">
                  <button
                    onClick={() => handleGetStarted(product.name)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 sm:py-1.5 lg:py-1 px-2 sm:px-3 lg:px-2 rounded-lg font-medium text-xs transition-colors duration-200 flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3 lg:h-3" />
                    <span className="hidden sm:inline lg:hidden">Buy Now</span>
                    <span className="sm:hidden lg:inline">Buy</span>
                  </button>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? `No products match "${searchTerm}". Try adjusting your search or filters.`
                  : "No products match your current filters. Try adjusting your filter criteria."
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterBy({category: "all", priceRange: "all", rating: "all"});
                  setSortBy("popular");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 mb-8">
            <div className="flex items-center gap-3">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="group relative px-4 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:hover:scale-100 flex items-center justify-center min-w-[50px]"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current page
                  const shouldShow = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  if (!shouldShow) {
                    // Show ellipsis for gaps
                    if (page === 2 && currentPage > 3) {
                      return <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-400 font-medium">⋯</span>;
                    }
                    if (page === totalPages - 1 && currentPage < totalPages - 2) {
                      return <span key={`ellipsis-${page}`} className="px-3 py-2 text-gray-400 font-medium">⋯</span>;
                    }
                    return null;
                  }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-110 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200'
                        }`}
                      >
                        {page}
                        {currentPage === page && (
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 animate-pulse"></div>
                        )}
                      </button>
                    );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="group relative px-4 py-3 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:hover:scale-100 flex items-center justify-center min-w-[50px]"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
