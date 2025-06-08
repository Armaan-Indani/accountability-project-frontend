import React, { useState } from "react";
import { Save, Edit2, Calendar } from "lucide-react";
import NavBar from "../components/NavBar";

export default function ReflectionPagePreview() {
  const [criticalAnalysis, setCriticalAnalysis] = useState("");
  const [isEditingAnalysis, setIsEditingAnalysis] = useState(true);
  const [satisfaction, setSatisfaction] = useState(0);
  const [mood, setMood] = useState(0);
  const [productivity, setProductivity] = useState(0);
  const [isEditingReflection, setIsEditingReflection] = useState(true);

  const handleSaveAnalysis = () => setIsEditingAnalysis(false);
  const handleEditAnalysis = () => setIsEditingAnalysis(true);
  const handleSaveReflection = () => setIsEditingReflection(false);
  const handleEditReflection = () => setIsEditingReflection(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <NavBar />
      {/* Main Content Container */}
      <div className="pt-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Continuous improvement is better than delayed perfection!
        </h2>
        {/* Top Sections Container */}
        <div className="w-full flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 mb-8">
          {/* Critical Analysis Section - Left Half */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-8 max-h-[78vh]">
            <div className="space-y-4 flex flex-col h-full">
              {isEditingAnalysis ? (
                <textarea
                  value={criticalAnalysis}
                  onChange={(e) => setCriticalAnalysis(e.target.value)}
                  placeholder="Space for critical analysis"
                  className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none flex-1"
                />
              ) : (
                <div className="w-full h-48 p-4 border rounded-lg bg-gray-50 overflow-auto text-left flex-1">
                  {criticalAnalysis.trim() === ""
                    ? "No Analysis yet..."
                    : criticalAnalysis
                        .trim()
                        .split("\n")
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                </div>
              )}

              <div className="flex justify-end space-x-4">
                {isEditingAnalysis ? (
                  <button
                    onClick={handleSaveAnalysis}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                ) : (
                  <button
                    onClick={handleEditAnalysis}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    <Edit2 className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Daily Reflection Section - Right Half */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-8 max-h-[78vh] overflow-y-scroll">
            <div className="space-y-4">
              <div className="space-y-4">
                {/* Satisfaction Scale */}
                <div className="p-4 border rounded-lg">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    How satisfied are you today with your work?
                  </label>
                  {isEditingReflection ? (
                    <div className="flex flex-col">
                      <div className="flex justify-evenly items-center">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() => setSatisfaction(value)}
                            className={`
                    w-8 h-8 rounded-full font-bold text-lg transition-all
                    ${
                      satisfaction === value
                        ? "bg-indigo-600 text-white scale-110"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                    `}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                      {satisfaction !== 0 && (
                        <button
                          onClick={() => setSatisfaction(0)}
                          className="text-indigo-600 hover:underline mt-1 text-right"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 border rounded-lg bg-gray-50">
                      {satisfaction === 0 ? (
                        "Satisfaction level: Not Filled"
                      ) : (
                        <>Satisfaction level: {satisfaction} out of 5</>
                      )}
                    </div>
                  )}
                </div>

                {/* Productivity Scale */}
                <div className="p-4 border rounded-lg">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    How productive have you been today?
                  </label>
                  {isEditingReflection ? (
                    <div className="flex flex-col">
                      <div className="flex justify-evenly items-center">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() => setProductivity(value)}
                            className={`
                    w-8 h-8 rounded-full font-bold text-lg transition-all
                    ${
                      productivity === value
                        ? "bg-indigo-600 text-white scale-110"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                      {productivity !== 0 && (
                        <button
                          onClick={() => setProductivity(0)}
                          className="text-indigo-600 hover:underline mt-1 text-right"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 border rounded-lg bg-gray-50">
                      {productivity === 0 ? (
                        "Productivity level: Not Filled"
                      ) : (
                        <>Productivity level: {productivity} out of 5</>
                      )}
                    </div>
                  )}
                </div>

                {/* Mood Scale */}
                <div className="p-4 border rounded-lg">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    How would you rate your mood throughout today?
                  </label>
                  {isEditingReflection ? (
                    <div className="flex flex-col">
                      <div className="flex justify-evenly items-center">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() => setMood(value)}
                            className={`
                    w-8 h-8 rounded-full font-bold text-lg transition-all
                    ${
                      mood === value
                        ? "bg-indigo-600 text-white scale-110"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                      {mood !== 0 && (
                        <button
                          onClick={() => setMood(0)}
                          className="text-indigo-600 hover:underline mt-1 text-right"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 border rounded-lg bg-gray-50">
                      {mood === 0 ? (
                        "Mood level: Not Filled"
                      ) : (
                        <>Mood level: {mood} out of 5</>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Save/Edit Button */}
              <div className="flex justify-end">
                {isEditingReflection ? (
                  <button
                    onClick={handleSaveReflection}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Reflection</span>
                  </button>
                ) : (
                  <button
                    onClick={handleEditReflection}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md hover:shadow-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                    <span>Edit Reflection</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Section */}
        <div className="w-full bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            A vision without a strategy remains an illusion.
          </h2>
          <button
            onClick={() => (window.location.href = "/#todo")}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg mx-auto"
          >
            <Calendar className="w-5 h-5" />
            <span>Plan for tomorrow</span>
          </button>
        </div>
      </div>
    </div>
  );
}
