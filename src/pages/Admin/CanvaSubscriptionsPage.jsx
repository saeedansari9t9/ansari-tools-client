import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Users,
  Clock as ClockIcon
} from 'lucide-react';
import { toast } from 'react-toastify';

const CanvaSubscriptionsPage = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [allSubscriptions, setAllSubscriptions] = useState([]); // Store original data
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState('all'); // 'all', '6 Months', '1 Year'
  const [sortBy, setSortBy] = useState('none'); // 'none', 'daysRemaining' or 'date'
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Sort subscriptions based on sortBy and sortOrder
  const sortSubscriptions = useCallback((subs) => {
    // If no sorting is selected, return original order
    if (sortBy === 'none' || sortOrder === 'none') {
      return [...subs];
    }

    return [...subs].sort((a, b) => {
      let aValue, bValue;

      if (sortBy === 'daysRemaining') {
        aValue = calculateDays(a).remainingDays;
        bValue = calculateDays(b).remainingDays;
      } else if (sortBy === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }, [sortBy, sortOrder]);

  // Apply sorting, filtering, and pagination
  useEffect(() => {
    if (allSubscriptions.length > 0) {
      let filteredSubs = allSubscriptions;

      // Apply search filter
      if (searchTerm) {
        filteredSubs = filteredSubs.filter(sub =>
          sub.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply duration filter
      if (durationFilter !== 'all') {
        filteredSubs = filteredSubs.filter(sub =>
          sub.duration === durationFilter
        );
      }

      // Apply sorting
      const sortedSubs = sortSubscriptions(filteredSubs);

      // Update total pages based on filtered results
      setTotalPages(Math.ceil(sortedSubs.length / 20));

      // Apply pagination (show 20 items per page)
      const startIndex = (currentPage - 1) * 20;
      const endIndex = startIndex + 20;
      const paginatedSubs = sortedSubs.slice(startIndex, endIndex);

      setSubscriptions(paginatedSubs);
    }
  }, [allSubscriptions, searchTerm, durationFilter, sortBy, sortOrder, sortSubscriptions, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, durationFilter, sortBy, sortOrder]);

  // Calculate stats directly from allSubscriptions array (complete data)
  const stats = {
    total: allSubscriptions.length,
    active: allSubscriptions.filter(sub => sub.status === 'active').length,
    oneMonth: allSubscriptions.filter(sub => sub.duration === '1 Month').length,
    threeMonths: allSubscriptions.filter(sub => sub.duration === '3 Months').length,
    sixMonths: allSubscriptions.filter(sub => sub.duration === '6 Months').length,
    oneYear: allSubscriptions.filter(sub => sub.duration === '1 Year').length
  };

  // Calculate days used and remaining days
  const calculateDays = (subscription) => {
    const startDate = new Date(subscription.date);
    const currentDate = new Date();
    const daysUsed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

    // Calculate total days based on duration
    let totalDays;
    if (subscription.duration === '1 Month') {
      totalDays = 30; // 1 month approx 30 days
    } else if (subscription.duration === '3 Months') {
      totalDays = 90; // 3 months approx 90 days
    } else if (subscription.duration === '6 Months') {
      totalDays = 180; // 6 months = 180 days
    } else if (subscription.duration === '1 Year') {
      totalDays = 365; // 1 year = 365 days
    } else {
      totalDays = 0;
    }

    const remainingDays = Math.max(0, totalDays - daysUsed);

    return { daysUsed, remainingDays, totalDays };
  };

  // Format days to "X months Y days" format
  const formatDays = (days) => {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;

    if (months > 0 && remainingDays > 0) {
      return `${months} month${months > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      return `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }
  };

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch ALL subscriptions without pagination for client-side filtering and stats
      const response = await fetch(`https://api.ansaritools.com/api/canva-subscriptions?limit=1000`);
      const data = await response.json();

      if (response.ok) {
        setAllSubscriptions(data.subscriptions);
      } else {
        toast.error('Error fetching subscriptions');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);


  const handleDelete = async (id) => {
    // Find the subscription to get the email
    const subscription = allSubscriptions.find(sub => sub._id === id);
    const email = subscription ? subscription.email : 'Unknown';

    if (!window.confirm(`Are you sure you want to delete subscription for ${email}?`)) return;

    try {
      const response = await fetch(`https://api.ansaritools.com/api/canva-subscriptions/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success(`${email} deleted!`);
        fetchSubscriptions();
      } else {
        toast.error('Error deleting subscription');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error');
    }
  };

  const handleEdit = (subscription) => {
    setEditingId(subscription._id);
    setEditForm({
      email: subscription.email,
      duration: subscription.duration,
      date: new Date(subscription.date).toISOString().split('T')[0],
      status: subscription.status
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://api.ansaritools.com/api/canva-subscriptions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        toast.success('Subscription updated successfully');
        setEditingId(null);
        fetchSubscriptions();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Error updating subscription');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Network error');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-yellow-500" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Canva Subscriptions</h1>
                <p className="text-gray-600 mt-1 text-xs sm:text-base">Manage all Canva subscriptions</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-2 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-600">Total</p>
                  <p className="text-sm sm:text-2xl font-bold text-blue-900">{stats.total || 0}</p>
                </div>
                <BarChart3 className="w-4 h-4 sm:w-8 sm:h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-2 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-green-600">Active</p>
                  <p className="text-sm sm:text-2xl font-bold text-green-900">{stats.active || 0}</p>
                </div>
                <CheckCircle className="w-4 h-4 sm:w-8 sm:h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-2 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-orange-600">1 Month</p>
                  <p className="text-sm sm:text-2xl font-bold text-orange-900">{stats.oneMonth || 0}</p>
                </div>
                <Clock className="w-4 h-4 sm:w-8 sm:h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-2 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-teal-600">3 Months</p>
                  <p className="text-sm sm:text-2xl font-bold text-teal-900">{stats.threeMonths || 0}</p>
                </div>
                <Clock className="w-4 h-4 sm:w-8 sm:h-8 text-teal-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-2 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-yellow-600">6 Months</p>
                  <p className="text-sm sm:text-2xl font-bold text-yellow-900">{stats.sixMonths || 0}</p>
                </div>
                <Clock className="w-4 h-4 sm:w-8 sm:h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-2 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-purple-600">1 Year</p>
                  <p className="text-sm sm:text-2xl font-bold text-purple-900">{stats.oneYear || 0}</p>
                </div>
                <Users className="w-4 h-4 sm:w-8 sm:h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Add Subscription Button */}
          <div className="mb-4">
            <button
              onClick={() => navigate('/admin/add-canva-subscription')}
              className="w-full sm:w-auto px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 text-xs sm:text-base"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Add Subscription</span>
            </button>
          </div>

          {/* Search, Filter and Sort */}
          <div className="flex flex-col gap-2">
            <div className="flex-1 relative">
              <Search className="w-3 h-3 sm:w-5 sm:h-5 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 text-xs sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontSize: '16px' }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Clear search"
                >
                  <XCircle className="w-3 h-3 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
            <div className="flex flex-row gap-1 sm:gap-2">
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">None</option>
                <option value="daysRemaining">Remaining Days</option>
                <option value="date">Sort by Date</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">None</option>
                <option value="asc">L to H</option>
                <option value="desc">H to L</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading subscriptions...</p>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No subscriptions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Used</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.map((subscription) => {
                    // Calculate Expiry Date Logic
                    const calculateExpiryDate = (startDate, duration) => {
                      const date = new Date(startDate);
                      if (duration === '1 Month') date.setMonth(date.getMonth() + 1);
                      else if (duration === '3 Months') date.setMonth(date.getMonth() + 3);
                      else if (duration === '6 Months') { date.setMonth(date.getMonth() + 6); }
                      else if (duration === '1 Year') { date.setFullYear(date.getFullYear() + 1); }
                      return date;
                    };

                    const formatDate = (dateString) => {
                      const date = new Date(dateString);
                      const day = date.getDate();
                      const month = date.toLocaleString('default', { month: 'short' });
                      const year = date.getFullYear();
                      return `${day}-${month}-${year}`;
                    };

                    const expiryDate = calculateExpiryDate(subscription.date, subscription.duration);

                    return (
                      <tr key={subscription._id} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                          {editingId === subscription._id ? (
                            <input
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ) : (
                            <div className="flex items-center">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                              <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{subscription.email}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 mr-1 sm:mr-2" />
                            <span className="text-xs sm:text-sm text-gray-900">
                              {formatDays(calculateDays(subscription).daysUsed)}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-1 sm:mr-2" />
                            <span className={`text-xs sm:text-sm font-medium ${calculateDays(subscription).remainingDays <= 7
                              ? 'text-red-600'
                              : calculateDays(subscription).remainingDays <= 30
                                ? 'text-yellow-600'
                                : 'text-green-600'
                              }`}>
                              {formatDays(calculateDays(subscription).remainingDays)}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                          {editingId === subscription._id ? (
                            <select
                              value={editForm.duration}
                              onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                              className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="6 Months">6 Months</option>
                              <option value="1 Year">1 Year</option>
                              <option value="1 Month">1 Month</option>
                              <option value="3 Months">3 Months</option>
                            </select>
                          ) : (
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                              <span className="text-xs sm:text-sm text-gray-900">{subscription.duration}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                          {editingId === subscription._id ? (
                            <input
                              type="date"
                              value={editForm.date}
                              onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ) : (
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                              <span className="text-xs sm:text-sm text-gray-900">
                                {formatDate(subscription.date)}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mr-1 sm:mr-2" />
                            <span className="text-xs sm:text-sm text-gray-900">
                              {formatDate(expiryDate)}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                          {editingId === subscription._id ? (
                            <div className="flex space-x-1 sm:space-x-2">
                              <button
                                onClick={() => handleUpdate(subscription._id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="w-6 h-6 ml-2 sm:w-6 sm:h-6" />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="w-6 h-6 sm:w-6 sm:h-6" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleEdit(subscription)}
                                className="text-blue-600 hover:text-blue-700 p-1"
                                title="Edit"
                              >
                                <Edit className="w-5 h-5 sm:w-6 sm:h-6" />
                              </button>
                              <button
                                onClick={() => handleDelete(subscription._id)}
                                className="text-red-600 hover:text-red-700 p-1"
                                title="Delete"
                              >
                                <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                          {editingId === subscription._id ? (
                            <select
                              value={editForm.status}
                              onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                              className="w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="expired">Expired</option>
                            </select>
                          ) : (
                            <span className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                              {getStatusIcon(subscription.status)}
                              <span className="ml-1">{subscription.status}</span>
                            </span>
                          )}
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-2 sm:px-6 py-2 sm:py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-2 relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvaSubscriptionsPage;
