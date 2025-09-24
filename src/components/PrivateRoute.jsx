// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   // Show loading state while checking authentication
//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   // Render children if authenticated
//   return children;
// };

// export default PrivateRoute;


// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      localStorage.setItem("token", response.data.token);  // Save token to local storage
      navigate("/dashboard");  // Redirect to dashboard or home page
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
