import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import AllRoutes from "./AllRoutes"
import Cookies from 'js-cookie';
import "./App.css"

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.pathname = "/E-comm";
    }
  }, []);





  return (
    <div className='app'>
      <Router basename='/E-comm'>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  )
}

export default App
