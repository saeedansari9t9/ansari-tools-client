import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextDefinition';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        
        if (token) {
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUser({ token, ...parsedUserData });
          } else {
            setUser({ token });
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = (token, userData = null) => {
    if (!token) {
      console.error('Login failed: No token provided');
      return;
    }
    
    try {
      localStorage.setItem('token', token);
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        const userWithData = { token, ...userData };
        setUser(userWithData);
      } else {
        setUser({ token });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setUser(null);
      // Redirect to login page or home page after logout if needed
      // window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  // Check if user is authenticated
  const isAuthenticated = user && user.token ? true : false;
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};