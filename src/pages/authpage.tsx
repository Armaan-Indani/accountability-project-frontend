import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
// const BASE_URL = process.env.BACKEND_URL;
const BASE_URL = "http://localhost:5000";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle authentication logic here

    const endpoint = isLogin ? "/api/auth/login" : "/api/user/register";
    const url = `${BASE_URL}${endpoint}`;

    // Set the appropriate endpoint
    const requestData = { email: email, password: password, url }; // Prepare the request body

    try {
      const response = await axios.post(url, requestData);

      if (response.status === 200 || response.status === 201) {
        console.log("Success:", response.data);

        if (isLogin) {
          // Save the token to localStorage or cookies
          localStorage.setItem("token", response.data.data);

          // Optionally redirect the user to the dashboard or other page
          console.log("Login successful!, token is: ", response.data.data);
          window.location.href = "/";
        } else {
          console.log("Registration successful! Please log in.");
        }
      } else {
        // Handle unexpected status codes
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error(
          "Error:",
          error.response.data.message || error.response.data
        );
      } else if (error.request) {
        // No response was received from the server
        console.error("No response from the backend:", error.request);
      } else {
        // Something happened setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }

    console.log("Form submitted:", { email, password, isLogin });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome!" : "Create Account"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isLogin ? "Please sign in to continue" : "Sign up to get started"}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="mr-2">
              {isLogin ? "Sign in" : "Create account"}
            </span>
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
