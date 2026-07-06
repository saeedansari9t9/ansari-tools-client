import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CustomLoader from './CustomLoader';

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Check for adminData in localStorage
        const adminData = localStorage.getItem('adminData');

        if (!adminData) {
          navigate('/');
          return;
        }

        // Verify token with backend (cookies automatically attached via fetch wrapper)
        const response = await fetch('https://api.ansaritools.com/api/admins/verify', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setIsAuthorized(true);
        } else {
          // Only log out if it's an authentic verification failure (401/403)
          if (response.status === 401 || response.status === 403) {
            logout();
          }
          navigate('/');
        }
      } catch (error) {
        console.error('Admin verification error (likely network/IP change):', error);
        // Do NOT logout or clear credentials on network glitches. Just redirect to safety.
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate]);

  if (loading) {
    return <CustomLoader />;
  }

  if (!isAuthorized) {
    return null; // Will redirect to login
  }

  return children;
};

export default AdminGuard;
