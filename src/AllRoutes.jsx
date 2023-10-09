import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import CreateProduct from './components/CreateProduct'
import Users from './components/Users'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/craeteProduct' element={<CreateProduct />} />
      <Route path='/users' element={<Users />} />
    </Routes>
  )
}

export default AllRoutes
