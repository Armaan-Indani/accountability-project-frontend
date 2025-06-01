import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TodoList from "../components/TodoList.tsx";
import QuoteSection from "../components/QuoteSection.tsx";
import NavBar from "../components/NavBar.tsx";
// import Calendar from "../components/Calendar.tsx";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // Remove #
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100">
      <NavBar />
      <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row items-center justify-evenly p-4 md:p-0">
        <style>{`
          @keyframes scaleIn {
            0% {
              opacity: 0;
              transform: scale(0.5);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
        <QuoteSection />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="todo">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Let's make each day count!
          </h2>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
