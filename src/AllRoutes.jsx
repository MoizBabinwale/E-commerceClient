import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateProduct from "./components/CreateProduct";
import Users from "./components/Users";
import DetailPage from "./components/DetailPage";
import { useLocation } from "react-router-dom";

const AllRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    const body = document.querySelector("body");

    if (location.pathname === "/craeteProduct") {
      body.classList.add("route-with-hidden-overflow");
    } else {
      body.classList.remove("route-with-hidden-overflow");
    }
    return () => {
      // Clean up on component unmount
      body.classList.remove("route-with-hidden-overflow");
    };
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/craeteProduct" element={<CreateProduct />} />
      <Route path="/users" element={<Users />} />
      <Route path="/product-details/:productId" element={<DetailPage />} />
    </Routes>
  );
};

export default AllRoutes;
