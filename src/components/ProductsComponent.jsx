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

  // Fetch products from API
  const { products: apiProducts, error } = useProducts();

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


                {/* Clear Filters */}
                {(filterBy.category !== "all" || filterBy.priceRange !== "all") && (
                  <button
                    onClick={() => setFilterBy({category: "all", priceRange: "all"})}
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
                {(filterBy.category !== "all" || filterBy.priceRange !== "all") && (
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
              

              {/* Mobile Clear Button */}
              {(filterBy.category !== "all" || filterBy.priceRange !== "all") && (
                <button
                  onClick={() => {
                    setFilterBy({category: "all", priceRange: "all"});
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
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="bg-white/90 hover:bg-white text-gray-700 p-1 sm:p-1.5 lg:p-2 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center"
                  >
                    <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                  </button>
                  </div>
              </Link>

              {/* Product Info */}
              <div className="p-2 sm:p-3 lg:p-2.5">

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
