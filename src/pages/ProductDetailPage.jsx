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

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Fetch product data from API
  const { product, loading, error } = useProduct(id);

  // Fallback product data (remove this after API is working)
  const fallbackProducts = [
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
