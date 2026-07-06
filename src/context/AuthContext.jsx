import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextDefinition';

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if admin is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const adminData = localStorage.getItem('adminData');
        
        if (adminData) {
          // Pre-load from localStorage first to keep UI fast
          const parsedAdminData = JSON.parse(adminData);
          setAdmin(parsedAdminData);

          // Background verification check with backend
          try {
            const response = await fetch('https://api.ansaritools.com/api/admins/verify', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              if (response.status === 401 || response.status === 403) {
                // Token is genuinely expired/invalid, clear local storage
                localStorage.removeItem('adminData');
                setAdmin(null);
              }
            }
          } catch (fetchErr) {
            console.error('Admin token verify failed due to network error:', fetchErr);
            // Do NOT log out or delete local storage on network errors (e.g. temporary IP change drops)
          }
        }
      } catch (error) {
        console.error('Error checking admin authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function for admin (backward compatible signature)
  const login = (firstArg, secondArg = null) => {
    let adminData = null;
    if (typeof firstArg === 'object' && firstArg !== null) {
      adminData = firstArg;
    } else if (secondArg) {
      adminData = secondArg;
    }
    
    try {
      if (adminData) {
        localStorage.setItem('adminData', JSON.stringify(adminData));
        setAdmin(adminData);
      }
    } catch (error) {
      console.error('Error during admin login:', error);
    }
  };
  
  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem('adminData');
      setAdmin(null);
    } catch (error) {
      console.error('Error during admin logout:', error);
    }
  };
  
  // Check if admin is authenticated
  const isAuthenticated = admin ? true : false;
  
  const value = {
    user: admin, // Keep 'user' for backward compatibility
    admin,
    loading,
    login,
    logout,
    isAuthenticated
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};