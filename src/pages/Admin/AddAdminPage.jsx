import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Mail, Shield, CheckCircle, XCircle, User, Phone, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

const AddAdminPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Real-time validation
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{11}$/.test(value)) {
          error = 'Phone number must be exactly 11 digits';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(value)) {
          error = 'Password must contain at least one capital letter';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  // Validation functions
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one capital letter' };
    }
    return { valid: true, message: '' };
  };

  const validateForm = () => {
    // First name validation
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      return false;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      return false;
    }

    // Email validation
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!validatePhone(formData.phone)) {
      toast.error('Phone number must be exactly 11 digits');
      return false;
    }

    // Password validation
    if (!formData.password) {
      toast.error('Password is required');
      return false;
    }
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.message);
      return false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      console.log('Sending admin data:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: '***',
        isAdmin: true
      });

      const adminToken = localStorage.getItem('adminToken');
      
      const response = await fetch('https://api.ansaritools.com/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          isAdmin: true
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        toast.success('New admin created successfully!');
        navigate('/admin');
      } else {
        toast.error(data.message || 'Error creating admin');
      }
    } catch (error) {
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      toast.error(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Admin</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Create a new administrator account</p>
            </div>
          </div>

          {/* Admin Info Card */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Admin Privileges</h3>
                <p className="text-sm text-gray-600">New admin will have access to:</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Product Management</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Canva Subscriptions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>User Management</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Admin Dashboard</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                      errors.firstName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter first name"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <XCircle className="w-3 h-3 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                      errors.lastName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <XCircle className="w-3 h-3 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <XCircle className="w-3 h-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={11}
                  pattern="[0-9]{11}"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="03123456789"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <XCircle className="w-3 h-3 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Enter secure password"
                  />
                </div>
                {errors.password ? (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <XCircle className="w-3 h-3 mr-1" />
                    {errors.password}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with at least 1 capital letter</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Confirm password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <XCircle className="w-3 h-3 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Security Notice</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Make sure to use a strong password and share the credentials securely with the new admin.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Admin...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Admin</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdminPage;
