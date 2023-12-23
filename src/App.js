import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllRoutes from "./AllRoutes"
import "./App.css"

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.pathname = "/E-comm";
    }
  }, []);





  return (
    <div className='app '>
      <Router basename='/E-comm'>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  )
}

export default App
