import React from "react";
import "./App.css";
import HomePage from "./pages/homepage.tsx";
import GoalsPage from "./pages/goalpage.tsx";

function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <GoalsPage></GoalsPage>
    </div>
  );
}

export default App;
