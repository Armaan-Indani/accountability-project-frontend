import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-full shadow-lg"></div>
              <span className="ml-2 text-xl font-bold text-gray-800">Logo</span>
            </a>
          </div>
          <div className="flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all hover:shadow-md"
            >
              Home
            </a>
            <a
              href="/goals"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all hover:shadow-md"
            >
              Goals
            </a>
            <a
              href="/analysis"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all hover:shadow-md"
            >
              Analysis
            </a>
            <a
              href="/settings"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all hover:shadow-md"
            >
              Settings
            </a>
            <a
              href="/logout"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
