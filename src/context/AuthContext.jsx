import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // You could verify the token here or fetch user data
          setUser({ token });
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
  const login = (token) => {
    if (!token) {
      console.error('Login failed: No token provided');
      return;
    }
    
    try {
      localStorage.setItem('token', token);
      setUser({ token });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem('token');
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