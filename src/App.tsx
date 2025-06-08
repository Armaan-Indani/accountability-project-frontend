import React from "react";
import "./App.css";
import HomePage from "./pages/homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/authpage";
import ProtectedRoute from "./utils/authenticationGuard";
import SettingsPage from "./pages/settingspage";
import JournalsPage from "./pages/journalspage";
import AnalysisPage from "./pages/analysispage";
import GoalPage from "./pages/goalpage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/"
            element={<ProtectedRoute children={<HomePage />} />}
            // element={<HomePage />}
          />
          <Route
            path="/goals"
            element={<ProtectedRoute children={<GoalPage />} />}
            // element={<GoalPage />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute children={<SettingsPage />} />}
            // element={<SettingsPage />}
          />
          <Route
            path="/journal"
            element={<ProtectedRoute children={<JournalsPage />} />}
            // element={<JournalsPage />}
          />
          <Route
            path="/analysis"
            element={<ProtectedRoute children={<AnalysisPage />} />}
            // element={<AnalysisPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
