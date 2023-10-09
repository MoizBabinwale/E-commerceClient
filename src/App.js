import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import AllRoutes from "./AllRoutes"
import Cookies from 'js-cookie';
import "./App.css"

function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  )
}

export default App
