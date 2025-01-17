import React from "react";
import "./App.css";
import HomePage from "./pages/homepage.tsx";
import GoalsPage from "./pages/goalpage.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/authpage.tsx";
import ProtectedRoute from "./utils/authenticationGuard.tsx";
import SettingsPage from "./pages/settingspage.tsx";

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
            element={<GoalsPage />}
          />
          <Route
            path="/settings"
            // element={<ProtectedRoute children={<SettingsPage />} />}
            element={<SettingsPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
