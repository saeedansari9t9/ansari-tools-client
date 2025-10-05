import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Check for admin token in localStorage
        const adminToken = localStorage.getItem('adminToken');
        const adminData = localStorage.getItem('adminData');

        if (!adminToken || !adminData) {
          navigate('/');
          return;
        }

        // Verify token with backend
        const response = await fetch('http://localhost:5000/api/admins/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setIsAuthorized(true);
        } else {
          // Token is invalid, clear storage and redirect
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          navigate('/');
        }
      } catch (error) {
        console.error('Admin verification error:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect to login
  }

  return children;
};

export default AdminGuard;
