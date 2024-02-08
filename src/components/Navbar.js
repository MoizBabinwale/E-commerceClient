import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { serchedFunction } from "../actions/ProductActions";
import Swal from "sweetalert2";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import logo from "../assets/logo.png";
import { CiShoppingCart } from "react-icons/ci";
import Modal from "./Modal";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    var userData = JSON.parse(localStorage.getItem("Profile"));
    setLightMode();
    if (userData) {
      const expireTime = userData.expiresIn;
      var alredyExpiryset = localStorage.getItem("expireTime");
      if (expireTime === "1h" && !alredyExpiryset) {
        var currentLogin = new Date().getTime();
        localStorage.setItem("expireTime", currentLogin);
      }
      checkAuth();
      setLogin(true);
    }
    var adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus) {
      setIsAdmin(adminStatus);
    }
  }, []);

  const checkAuth = () => {
    const currentTime = new Date().getTime();
    var loginTime = localStorage.getItem("expireTime");
    const expirationTime = new Date(Number.parseInt(loginTime)).getTime() + 1 * 60 * 60 * 1000;
    if (loginTime) {
      if (currentTime >= expirationTime) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Your Session has been Expired!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          handleLogout();
        }, 2500);
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("Profile");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("expireTime");
    window.location.reload();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    var searchedValue = document.getElementById("searchedTxt").value;
    try {
      dispatch(serchedFunction({ searchedValue }));
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = useSelector((state) => state.filteroptions);
  useEffect(() => {
    if (filterProducts.filterData) {
      const filterList = filterProducts.filterData.data;
      setFilterList(filterList);
    }
  }, [filterProducts]);

  const getProductByid = (item) => {
    console.log(item);
  };

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const changeMode = () => {
    if (!isLightMode) {
      setDarkMode();
      setIsLightMode(!isLightMode);
    } else {
      setLightMode();
      setIsLightMode(!isLightMode);
    }
  };

  // login
  // users
  const handleLinkClick = () => {
    setShowMenu(false); // Close the menu when a link is clicked
  };

  return (
    <div className="fixed md:flex top-0 left-0 right-0 z-50 bg-white max-w-full p-2 md:items-center">
      <img className="ml-2 rounded-md h-10 w-10" src={logo} alt="Logo" />
      <div className="flex flex-col md:flex md:flex-row md:gap-4 p-2 items-center justify-between w-full">
        <div className={`${showMenu ? "flex" : "hidden"} md:flex md:items-center md:justify-center md:w-full `}>
          <ul className={`list-none block leading-10  md:w-full flex-row md:flex md:justify-evenly  ${showMenu ? "flex-col" : "hidden"}`}>
            <li className="">
              <Link to="/" className="hover:text-gray-600" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-600" to="/users" onClick={handleLinkClick}>
                Users
              </Link>
            </li>
            {!login ? (
              <li>
                <Link to="/login" className="hover:text-gray-600" onClick={handleLinkClick}>
                  Signup/Login
                </Link>
              </li>
            ) : (
              <>
                <li className="hover:text-gray-800 hover:cursor-pointer" onClick={() => setShowModal(true)}>
                  Add New Slide
                </li>
                <Link to="/craeteProduct" className="hover:text-gray-600" onClick={handleLinkClick}>
                  Add New Product
                </Link>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center justify-end">
          <span className="cursor-pointer border p-2 md:border-none md:p-0 md:m-0 mr-2">
            <CiShoppingCart size={20} />
          </span>
          <span className="cursor-pointer border p-2 md:border-none md:p-0 md:m-0 ml-2">
            <IoIosSearch size={20} />
          </span>
        </div>
      </div>
      <div className="hamburger md:hidden block fixed right-8 top-5 ">{!showMenu ? <RxHamburgerMenu onClick={() => setShowMenu(true)} /> : <RxCross1 onClick={() => setShowMenu(false)} />}</div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Navbar;
