import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  Save,
  Image as ImageIcon,
  Package
} from 'lucide-react';
import { toast } from 'react-toastify';
import ApiService from '../../services/api';

export default function AddProductPage() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    duration: '',
    badge: '',
    rating: 4.5,
    reviews: 0,
    category: 'AI Tools',
    hasVariants: false,
    features: [''],
    specifications: [{ label: '', value: '' }],
    variants: []
  });

  const [variantData, setVariantData] = useState({
    id: '',
    name: '',
    price: '',
    originalPrice: '',
    priceNumber: 0,
    duration: '',
    description: '',
    features: ['']
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const addSpec = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { label: '', value: '' }]
    }));
  };

  const removeSpec = (index) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const handleVariantChange = (field, value) => {
    setVariantData(prev => ({ ...prev, [field]: value }));
  };

  const handleVariantFeatureChange = (index, value) => {
    const newFeatures = [...variantData.features];
    newFeatures[index] = value;
    setVariantData(prev => ({ ...prev, features: newFeatures }));
  };

  const addVariantFeature = () => {
    setVariantData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeVariantFeature = (index) => {
    const newFeatures = variantData.features.filter((_, i) => i !== index);
    setVariantData(prev => ({ ...prev, features: newFeatures }));
  };

  const addVariant = () => {
    if (variantData.id && variantData.name && variantData.price) {
      setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, { ...variantData }]
      }));
      setVariantData({
        id: '',
        name: '',
        price: '',
        originalPrice: '',
        priceNumber: 0,
        duration: '',
        description: '',
        features: ['']
      });
    }
  };

  const removeVariant = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      
      // Upload image to Cloudinary if selected
      if (imageFile) {
        const uploadResponse = await ApiService.uploadImage(imageFile);
        imageUrl = uploadResponse.imageUrl;
      }

      // Prepare product data
      const productData = {
        ...formData,
        image: imageUrl,
        features: formData.features.filter(f => f.trim() !== ''),
        specifications: formData.specifications.filter(s => s.label.trim() !== '' && s.value.trim() !== ''),
        variants: formData.variants.map(v => ({
          ...v,
          features: v.features.filter(f => f.trim() !== '')
        }))
      };

      // Create product
      await ApiService.createProduct(productData);
      
      toast.success('Product added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/admin');
      
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product: ' + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-3 sm:py-8">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Admin
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 lg:p-8">
            {/* Basic Information */}
            <div className="mb-4 sm:mb-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-6 flex items-center gap-2">
                <Package className="w-4 h-4 sm:w-6 sm:h-6" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="AI Tools">AI Tools</option>
                    <option value="Design Tools">Design Tools</option>
                    <option value="SEO Tools">SEO Tools</option>
                    <option value="Video Tools">Video Tools</option>
                    <option value="Writing Tools">Writing Tools</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Education">Education</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rs 1000"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Original Price
                  </label>
                  <input
                    type="text"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rs 1500"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/month"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Badge
                  </label>
                  <input
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Most Popular"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product description"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4 sm:mb-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-6 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                Product Image
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 sm:w-48 sm:h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-8 text-center">
                    <Upload className="w-6 h-6 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                    <p className="text-xs sm:text-base text-gray-600 mb-2 sm:mb-4">Upload product image</p>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-blue-600 text-white px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-xs sm:text-base"
                    >
                      Choose Image
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
              
              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
              
              <div className="space-y-4">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={spec.label}
                      onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Value"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(index)}
                      className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpec}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Specification
                </button>
              </div>
            </div>

            {/* Variants */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Variants</h2>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="hasVariants"
                    checked={formData.hasVariants}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Has Variants</span>
                </label>
              </div>

              {formData.hasVariants && (
                <div className="space-y-6">
                  {/* Add Variant Form */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Variant</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Variant ID"
                        value={variantData.id}
                        onChange={(e) => handleVariantChange('id', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Variant Name"
                        value={variantData.name}
                        onChange={(e) => handleVariantChange('name', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Price"
                        value={variantData.price}
                        onChange={(e) => handleVariantChange('price', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Original Price"
                        value={variantData.originalPrice}
                        onChange={(e) => handleVariantChange('originalPrice', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Price Number"
                        value={variantData.priceNumber}
                        onChange={(e) => handleVariantChange('priceNumber', parseInt(e.target.value) || 0)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Duration"
                        value={variantData.duration}
                        onChange={(e) => handleVariantChange('duration', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <textarea
                      placeholder="Variant Description"
                      value={variantData.description}
                      onChange={(e) => handleVariantChange('description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                    />

                    {/* Variant Features */}
                    <div className="space-y-2 mb-4">
                      <label className="block text-sm font-medium text-gray-700">Variant Features</label>
                      {variantData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleVariantFeatureChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter feature"
                          />
                          <button
                            type="button"
                            onClick={() => removeVariantFeature(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addVariantFeature}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add Feature
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={addVariant}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Variant
                    </button>
                  </div>

                  {/* Existing Variants */}
                  {formData.variants.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Added Variants</h3>
                      {formData.variants.map((variant, index) => (
                        <div key={index} className="bg-white p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{variant.name}</h4>
                              <p className="text-sm text-gray-600">{variant.price} {variant.duration}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeVariant(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-xs sm:text-base"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                Save Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
