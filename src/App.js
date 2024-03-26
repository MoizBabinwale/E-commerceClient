import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllRoutes from "./AllRoutes";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.pathname = "/E-comm";
    }
  }, []);
  useEffect(() => {
    console.log("API ", process.env);
  }, []);

  return (
    <div className="app ">
      <Router basename="/E-comm">
        <Navbar />
        <AllRoutes />
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
