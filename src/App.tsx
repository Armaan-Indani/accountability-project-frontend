import React from "react";
import "./App.css";
import HomePage from "./pages/homepage.tsx";
import GoalsPage from "./pages/goalpage.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/goals" element={<GoalsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
