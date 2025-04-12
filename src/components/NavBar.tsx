import React, { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg top-0 w-full z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src="/upward-logo.png" alt="Logo" className="pt-1 h-12" />
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
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
              href="/journal"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all hover:shadow-md"
            >
              Journal
            </a>
            <a
              href="/settings"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all hover:shadow-md"
            >
              Settings
            </a>
            <a
              href="/login"
              onClick = {() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Logout
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-all hover:shadow-md"
            >
              Home
            </a>
            <a
              href="/goals"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-all hover:shadow-md"
            >
              Goals
            </a>
            <a
              href="/analysis"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-all hover:shadow-md"
            >
              Analysis
            </a>
            <a
              href="/journal"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-all hover:shadow-md"
            >
              Journal
            </a>
            <a
              href="/settings"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-all hover:shadow-md"
            >
              Settings
            </a>
            <a
              href="/logout"
              className="bg-indigo-600 text-white block px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
