import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
// const BASE_URL = process.env.BACKEND_URL;
const BASE_URL = "http://localhost:5000";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle authentication logic here

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const url = `${BASE_URL}${endpoint}`;

    // Set the appropriate endpoint
    const requestData = isLogin
      ? {
          email: email,
          password: password,
          url,
        }
      : {
          email: email,
          password: password,
          username: username,
          name: name,
          occupation: occupation,
          url,
        };

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
          window.location.href = "/login";
          window.alert(
            "Registration successful! Please log in with your credentials."
          );
        }
      } else {
        // Handle unexpected status codes
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error:",
          error.response.data.message || error.response.data
        );
        window.alert(
          `Error: ${error.response.data.message || "An error occurred"}`
        );
      } else if (error.request) {
        console.error("No response from the backend:", error.request);
        window.alert("Error: No response from the backend. Please try again.");
      } else {
        console.error("Error setting up the request:", error.message);
        window.alert(`Error: ${error.message}`);
      }
    }

    // console.log("Form submitted:", { email, password, isLogin });
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          {!isLogin && (
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-left"
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

          {/* Username Field */}
          {!isLogin && (
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your username"
              />
            </div>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
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

          {/* Occupation Field */}
          {!isLogin && (
            <div className="space-y-2">
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Occupation
              </label>
              <input
                id="occupation"
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Engineer, Student, etc."
              />
            </div>
          )}

          {/* Forgot Password */}
          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
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
