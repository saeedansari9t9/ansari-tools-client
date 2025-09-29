import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextDefinition';

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if admin is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const adminData = localStorage.getItem('adminData');
        
        if (adminToken) {
          if (adminData) {
            const parsedAdminData = JSON.parse(adminData);
            setAdmin({ token: adminToken, ...parsedAdminData });
          } else {
            setAdmin({ token: adminToken });
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
  
  // Login function for admin
  const login = (token, adminData = null) => {
    if (!token) {
      console.error('Admin login failed: No token provided');
      return;
    }
    
    try {
      localStorage.setItem('adminToken', token);
      if (adminData) {
        localStorage.setItem('adminData', JSON.stringify(adminData));
        const adminWithData = { token, ...adminData };
        setAdmin(adminWithData);
      } else {
        setAdmin({ token });
      }
    } catch (error) {
      console.error('Error during admin login:', error);
    }
  };
  
  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      setAdmin(null);
    } catch (error) {
      console.error('Error during admin logout:', error);
    }
  };
  
  // Check if admin is authenticated
  const isAuthenticated = admin && admin.token ? true : false;
  
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