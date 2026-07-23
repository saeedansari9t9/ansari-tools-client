import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import {
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
  ChevronDown,
} from "lucide-react";

export default function ProductsComponent() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filterBy, setFilterBy] = useState({
    category: "all",
    priceRange: "all"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Skeleton component for loading state
  const ProductSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>

        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-3"></div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Features skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>

        {/* Price skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>

        {/* Button skeleton */}
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

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
    return []; // Return empty array if no API products
  }, [apiProducts]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) {
      return [];
    }

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

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceNumber - b.priceNumber;
        case "price-high":
          return b.priceNumber - a.priceNumber;
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-white px-6 py-2 rounded-lg transition-colors hover:opacity-90"
                style={{ backgroundColor: 'var(--color-mid-dark)' }}
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
    <div className="min-h-screen relative overflow-hidden bg-[#fcfaff] py-12 lg:py-24 px-4">
      {/* Decorative Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-40 right-[-10%] w-[30rem] h-[30rem] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-white text-[#2b0d66] border border-purple-200 shadow-sm mx-auto">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Premium Software Store
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Explore All <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b0d66] to-purple-500">Products</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find the perfect premium tools to elevate your workflow. High-quality software at unbeatable prices.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl p-4 sm:p-6 mb-10 border border-white">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-between">
            {/* Search Bar - Left Side */}
            <div className="relative w-full lg:w-96 flex-shrink-0">
              <div className="relative rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border-transparent rounded-xl focus:outline-none placeholder-gray-400 text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters and Sort - Right Side */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end overflow-x-auto pb-2 lg:pb-0">
              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={filterBy.category}
                    onChange={(e) => setFilterBy({ ...filterBy, category: e.target.value })}
                    className="appearance-none bg-gray-50 hover:bg-white border-transparent focus:border-purple-300 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer min-w-[160px] shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <option value="all">All Categories</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="Design Tools">Design Tools</option>
                    <option value="Writing Tools">Writing Tools</option>
                    <option value="Academic Tools">Academic Tools</option>
                    <option value="Professional Tools">Professional Tools</option>
                    <option value="SEO Tools">SEO Tools</option>
                    <option value="E-commerce Tools">E-commerce Tools</option>
                    <option value="Video Tools">Video Tools</option>
                    <option value="Security Tools">Security Tools</option>
                    <option value="Learning Tools">Learning Tools</option>
                    <option value="Business Tools">Business Tools</option>
                    <option value="Productivity Tools">Productivity Tools</option>
                    <option value="Marketing Tools">Marketing Tools</option>
                    <option value="Communication Tools">Communication Tools</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-purple-400" />
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="relative">
                  <select
                    value={filterBy.priceRange}
                    onChange={(e) => setFilterBy({ ...filterBy, priceRange: e.target.value })}
                    className="appearance-none bg-gray-50 hover:bg-white border-transparent focus:border-purple-300 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer min-w-[140px] shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <option value="all">All Prices</option>
                    <option value="under500">Under Rs 500</option>
                    <option value="500to2000">Rs 500 - Rs 2000</option>
                    <option value="over2000">Over Rs 2000</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-purple-400" />
                  </div>
                </div>

                {/* Clear Filters */}
                {(filterBy.category !== "all" || filterBy.priceRange !== "all") && (
                  <button
                    onClick={() => setFilterBy({ category: "all", priceRange: "all" })}
                    className="px-4 py-3 text-red-500 hover:text-white bg-red-50 hover:bg-red-500 rounded-xl transition-all duration-300 text-sm font-bold shadow-sm"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort Options */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-purple-50 text-[#2b0d66] border-purple-100 hover:bg-purple-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3.5 pr-10 text-sm font-bold cursor-pointer min-w-[160px] shadow-sm transition-all duration-300"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <SlidersHorizontal className="h-4 w-4 text-[#2b0d66]" />
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 text-white bg-gradient-to-r from-[#2b0d66] to-purple-600 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg font-medium"
              >
                <Filter className="w-4 h-4" />
                Filters
                {(filterBy.category !== "all" || filterBy.priceRange !== "all") && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">!</span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-6 p-5 bg-purple-50 rounded-2xl border border-purple-100 space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-[#2b0d66] mb-3">Filter Options</h3>
              
              <div className="relative">
                <label className="block text-xs font-bold text-purple-800 mb-1.5 uppercase tracking-wide">Category</label>
                <select
                  value={filterBy.category}
                  onChange={(e) => setFilterBy({ ...filterBy, category: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-purple-100 rounded-xl text-sm font-medium text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-300"
                >
                  <option value="all">All Categories</option>
                  <option value="AI Tools">AI Tools</option>
                  <option value="Design Tools">Design Tools</option>
                  <option value="Writing Tools">Writing Tools</option>
                  <option value="Academic Tools">Academic Tools</option>
                  <option value="Professional Tools">Professional Tools</option>
                  <option value="SEO Tools">SEO Tools</option>
                  <option value="E-commerce Tools">E-commerce Tools</option>
                  <option value="Video Tools">Video Tools</option>
                  <option value="Security Tools">Security Tools</option>
                  <option value="Learning Tools">Learning Tools</option>
                  <option value="Business Tools">Business Tools</option>
                  <option value="Productivity Tools">Productivity Tools</option>
                  <option value="Marketing Tools">Marketing Tools</option>
                  <option value="Communication Tools">Communication Tools</option>
                  <option value="Web Development">Web Development</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-xs font-bold text-purple-800 mb-1.5 uppercase tracking-wide">Price Range</label>
                <select
                  value={filterBy.priceRange}
                  onChange={(e) => setFilterBy({ ...filterBy, priceRange: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-purple-100 rounded-xl text-sm font-medium text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-300"
                >
                  <option value="all">All Prices</option>
                  <option value="under500">Under Rs 500</option>
                  <option value="500to2000">Rs 500 - Rs 2000</option>
                  <option value="over2000">Over Rs 2000</option>
                </select>
              </div>

              {/* Mobile Clear Button */}
              {(filterBy.category !== "all" || filterBy.priceRange !== "all") && (
                <button
                  onClick={() => {
                    setFilterBy({ category: "all", priceRange: "all" });
                    setShowFilters(false);
                  }}
                  className="w-full px-4 py-3.5 text-white bg-red-500 rounded-xl transition-all duration-300 text-sm font-bold shadow-md mt-4 hover:bg-red-600"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {loading ? (
            // Show skeleton loading state
            Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(43,13,102,0.12)] border border-gray-100 transition-all duration-500 overflow-hidden group flex flex-col ${
                  hoveredCard === product.id ? "transform -translate-y-2" : ""
                }`}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-[4/3] block bg-[#fcfaff] p-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="relative flex items-center justify-center text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg bg-gradient-to-r from-[#2b0d66] to-purple-600 shadow-md overflow-hidden group/badge">
                      <span className="relative z-10">{product.badge}</span>
                      <div className="absolute inset-0 -translate-x-full w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[15deg] animate-shimmer"></div>
                    </span>
                  </div>
                  {/* Quick View Button */}
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white text-[#2b0d66] p-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-700 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {product.description}
                  </p>

                  <div className="mt-auto border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-extrabold text-[#2b0d66]">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                         <span className="text-xs text-gray-400 line-through font-medium">
                           {product.originalPrice}
                         </span>
                      )}
                      <span className="text-[10px] uppercase font-bold text-purple-400 ml-auto bg-purple-50 px-2 py-1 rounded-md">
                        {product.duration || 'LIFETIME'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleGetStarted(product.name)}
                      className="w-full text-white py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg bg-gradient-to-r from-[#2b0d66] to-purple-600 hover:-translate-y-0.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {searchTerm
                  ? `We couldn't find anything matching "${searchTerm}". Try adjusting your keywords.`
                  : "No products match your current filters. Try adjusting your criteria."
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterBy({ category: "all", priceRange: "all", rating: "all" });
                  setSortBy("popular");
                }}
                className="text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg bg-gradient-to-r from-[#2b0d66] to-purple-600 hover:-translate-y-1"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center hover:shadow-md transition-all"
              >
                <svg className="w-5 h-5 text-[#2b0d66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 sm:gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const shouldShow =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  if (!shouldShow) {
                    if (page === 2 && currentPage > 3) {
                      return <span key={`ellipsis-${page}`} className="px-2 sm:px-3 py-2 text-gray-400 font-bold">⋯</span>;
                    }
                    if (page === totalPages - 1 && currentPage < totalPages - 2) {
                      return <span key={`ellipsis-${page}`} className="px-2 sm:px-3 py-2 text-gray-400 font-bold">⋯</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl font-bold text-sm transition-all shadow-sm ${currentPage === page
                        ? 'text-white bg-gradient-to-r from-[#2b0d66] to-purple-600 scale-105'
                        : 'text-gray-600 bg-white border border-gray-100 hover:bg-gray-50 hover:shadow-md'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center hover:shadow-md transition-all"
              >
                <svg className="w-5 h-5 text-[#2b0d66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          50% { transform: translateX(150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
      `}</style>
    </div>
  );
}
