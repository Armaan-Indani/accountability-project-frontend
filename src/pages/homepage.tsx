import React from "react";
import TodoList from "../components/TodoList.tsx";
import QuoteSection from "../components/QuoteSection.tsx";
import NavBar from "../components/NavBar.tsx";
import Calendar from "../components/Calendar.tsx";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      <div className="h-screen flex flex-col md:flex-row items-center justify-evenly p-4 md:p-0">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
