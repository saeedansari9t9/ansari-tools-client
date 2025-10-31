import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Mail, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../services/api';

const AddCanvaSubscriptionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    duration: '6 Months',
    date: new Date().toISOString().split('T')[0], // Today's date as default
    status: 'active',
    sendEmail: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = () => {
    setFormData(prev => ({ ...prev, sendEmail: !prev.sendEmail }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/canva-subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`${formData.email} added!`);
        navigate('/admin/canva-subscriptions');
      } else {
        toast.error(data.message || 'Error adding subscription');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => navigate('/admin/canva-subscriptions')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 sm:w-6 sm:h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Add Canva Subscription</h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm">Create a new Canva subscription for a user</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Email Field */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="user@example.com"
                />
              </div>

              {/* Duration Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Duration *
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                </select>
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Subscription Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Status Field */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

          {/* Send Email Toggle */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Send Email to User
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.sendEmail ? 'bg-green-500' : 'bg-gray-300'}`}
                aria-pressed={formData.sendEmail}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${formData.sendEmail ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
              <span className="text-sm text-gray-700">{formData.sendEmail ? 'On (default)' : 'Off'}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">If turned off, subscription will be created without sending an email.</p>
          </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-row items-center justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/canva-subscriptions')}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Preview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <span className="font-medium text-gray-600">Email:</span>
              <p className="text-gray-900 break-all">{formData.email || 'Not specified'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Duration:</span>
              <p className="text-gray-900">{formData.duration}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Date:</span>
              <p className="text-gray-900">{formData.date ? new Date(formData.date).toLocaleDateString() : 'Not specified'}</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <span className="font-medium text-gray-600">Status:</span>
              <div className="mt-1">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  formData.status === 'active' ? 'bg-green-100 text-green-800' :
                  formData.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {formData.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCanvaSubscriptionPage;
