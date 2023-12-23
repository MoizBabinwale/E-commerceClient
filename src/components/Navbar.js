import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewSlider, getAllSliders, serchedFunction } from '../actions/ProductActions';
import Swal from 'sweetalert2'
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"
import logo from "../assets/logo.jpg"
import { CiShoppingCart } from "react-icons/ci";


const Navbar = () => {
    const [login, setLogin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [isLightMode, setIsLightMode] = useState(false);
    const [filterList, setFilterList] = useState([]);
    const [formData, setFormData] = useState(new FormData());

    const dispatch = useDispatch()

    useEffect(() => {
        var userData = JSON.parse(localStorage.getItem("Profile"))
        setLightMode()
        if (userData) {
            const expireTime = userData.expiresIn
            var alredyExpiryset = localStorage.getItem("expireTime")
            if (expireTime === "1h" && !alredyExpiryset) {
                var currentLogin = new Date().getTime();
                localStorage.setItem("expireTime", currentLogin)
            }
            checkAuth()
            setLogin(true)
        }
        var adminStatus = localStorage.getItem("isAdmin")
        if (adminStatus) {
            setIsAdmin(adminStatus)
        }
    }, [])

    const checkAuth = () => {
        const currentTime = new Date().getTime()
        var loginTime = localStorage.getItem("expireTime")
        const expirationTime = new Date(Number.parseInt(loginTime)).getTime() + 1 * 60 * 60 * 1000;
        if (loginTime) {
            if (currentTime >= expirationTime) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Your Session has been Expired!',
                    showConfirmButton: false,
                    timer: 2000
                })
                setTimeout(() => {
                    handleLogout()
                }, 2500)
            }
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("Profile")
        localStorage.removeItem("isAdmin")
        localStorage.removeItem("expireTime")
        window.location.reload()
    }

    const handleFilter = (e) => {
        e.preventDefault()
        var searchedValue = document.getElementById("searchedTxt").value;
        try {
            dispatch(serchedFunction({ searchedValue }))
        } catch (error) {
            console.log(error);
        }
    }

    const filterProducts = useSelector(state => state.filteroptions)
    useEffect(() => {
        if (filterProducts.filterData) {
            const filterList = filterProducts.filterData.data;
            setFilterList(filterList)
        }
    }, [filterProducts])

    const getProductByid = (item) => {

        console.log(item);
    }

    const setDarkMode = () => {
        document.querySelector('body').setAttribute("data-theme", "dark")
    }
    const setLightMode = () => {
        document.querySelector('body').setAttribute("data-theme", "light")
    }

    const changeMode = () => {
        if (!isLightMode) {
            setDarkMode()
            setIsLightMode(!isLightMode)
        } else {
            setLightMode()
            setIsLightMode(!isLightMode)
        }
    }

    const handleSliderImage = (e) => {
        var selectedFile = e.target.files[0]
        // Handle the case where no file is selected
        if (!selectedFile) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Please Select Image To Upload!',
                showConfirmButton: false,
                timer: 2000
            })
            return;
        }
        var name = document.getElementById("SliderName").value;
        formData.delete('image'); // Clear previous image data
        formData.delete('name');
        const newFormData = new FormData(); // Create a new FormData object
        newFormData.append('image', selectedFile);
        newFormData.append('name', name);

        setFormData(newFormData)
    }

    const handleSaveSlider = async () => {
        try {
            const response = await dispatch(addNewSlider(formData))
            if (response.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Slider Uplaoded Successfully!',
                    showConfirmButton: false,
                    timer: 2000
                })
                setTimeout(() => {
                    dispatch(getAllSliders())
                    document.getElementById("closeSliderModal").click();
                }, 2500);
            }
        } catch (error) {
            console.log();

        }
    }

    // login
    // users
    return (
        <div className='w-full'>

            <div className='grid grid-cols-3 gap-4'>
                <p>1</p>
                <div>
                    <div>
                        <ul className='list-none flex hover:text-gray-800 w-full justify-evenly flex-row '>
                            <Link className='hover:text-gray-800' to="/"><li>Home</li></Link>
                            <Link className='hover:text-gray-800' to="/users"><li>Users</li></Link>
                            <Link className='hover:text-gray-800' to="/login"><li>Signup/Login</li></Link>
                        </ul>
                    </div>
                </div>
                <div className='flex items-end justify-end'>
                    <span><CiShoppingCart /></span>
                </div>
            </div >
        </div >
    );
};

export default Navbar;
