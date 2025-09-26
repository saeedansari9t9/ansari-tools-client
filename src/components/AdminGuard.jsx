import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const ADMIN_EMAIL = 'saeedansari9t9@gmail.com';

  useEffect(() => {
    const checkAdminAccess = () => {
      // Wait for auth context to finish loading
      if (loading) {
        return;
      }
      
      if (!isAuthenticated) {
        navigate('/admin/login');
        return;
      }

      // Check if user email matches admin email
      if (user && user.email === ADMIN_EMAIL) {
        setIsAuthorized(true);
      } else {
        navigate('/admin/login');
        return;
      }
    };

    checkAdminAccess();
  }, [isAuthenticated, user, loading, navigate]);

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
