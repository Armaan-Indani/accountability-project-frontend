import React from "react";
import "./App.css";
import HomePage from "./pages/homepage.tsx";
import GoalsPage from "./pages/goalpage.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/authpage.tsx";
import ProtectedRoute from "./utils/authenticationGuard.tsx";
import SettingsPage from "./pages/settingspage.tsx";
import JournalsPage from "./pages/journalspage.tsx";
import AnalysisPage from "./pages/analysispage.tsx";
import GoalManagementApp from "./pages/goalspage3.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/home"
            // element={<ProtectedRoute children={<HomePage />} />}
            element={<HomePage />}
          />
          <Route
            path="/goals"
            // element={<ProtectedRoute children={<GoalsPage />} />}
            // element={<GoalsPage />}
            element={<GoalManagementApp />}
          />
          <Route
            path="/settings"
            // element={<ProtectedRoute children={<SettingsPage />} />}
            element={<SettingsPage />}
          />
          <Route
            path="/journal"
            // element={<ProtectedRoute children={<JournalsPage />} />}
            element={<JournalsPage />}
          />
          <Route
            path="/analysis"
            // element={<ProtectedRoute children={<JournalsPage />} />}
            element={<AnalysisPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
