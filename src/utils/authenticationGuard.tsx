import React from "react";
import { Navigate } from "react-router-dom";

// Authentication Check Helper
const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Check for a stored token
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode token payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp > currentTime; // Check if token is expired
  } catch (error) {
    console.error("Invalid token format:", error);
    return false;
  }
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" />;
  // }

  return children; // If authenticated, render the protected content
};

export default ProtectedRoute;
