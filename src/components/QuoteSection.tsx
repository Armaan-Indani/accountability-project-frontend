import React from "react";

const QuoteSection = () => (
  <div className="text-center px-8 animate-[scaleIn_0.8s_ease-out]">
    <div className="flex flex-col items-center space-y-3">
      <span className="text-6xl font-bold text-gray-800 tracking-wide drop-shadow-md">
        TRUST
      </span>
      <span className="text-7xl font-extrabold text-gray-900 tracking-wider drop-shadow-lg">
        YOURSELF
      </span>
      <span className="text-5xl font-bold text-gray-800 drop-shadow-md">&</span>
      <div className="flex flex-col items-center space-y-2">
        <span className="text-6xl font-bold text-gray-800 drop-shadow-md">
          MAKE IT
        </span>
        <span className="text-7xl font-extrabold text-indigo-600 drop-shadow-lg">
          HAPPEN!
        </span>
      </div>
    </div>
  </div>
);

export default QuoteSection;
