import React from "react";
import { Navigate } from "react-router-dom";

// Authentication Check Helper
const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Check for a stored token
  return token !== null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    alert("Please login or sign up to access this page.");
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render the protected content
};

export default ProtectedRoute;
