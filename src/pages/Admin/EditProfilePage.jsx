import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Save, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
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

    // Phone validation
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!validatePhone(formData.phone)) {
      toast.error('Phone number must be exactly 11 digits');
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
      const adminToken = localStorage.getItem('adminToken');
      
      const response = await fetch(`https://ansari-tools-server.vercel.app/api/admins/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local storage with new data
        const updatedAdmin = {
          ...user,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim()
        };
        
        localStorage.setItem('adminData', JSON.stringify(updatedAdmin));
        login(adminToken, updatedAdmin);
        
        toast.success('Profile updated successfully!');
        navigate('/admin');
      } else {
        toast.error(data.message || 'Error updating profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate('/admin')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Update your personal information</p>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
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
                value={user.email}
                disabled
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="Email address"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="03123456789"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Enter 11-digit phone number</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
