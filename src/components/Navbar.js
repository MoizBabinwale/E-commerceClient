import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewSlider, getAllSliders, serchedFunction } from '../actions/ProductActions';
import Swal from 'sweetalert2'
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"
import logo from "../assets/logo.jpg"


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
        console.log(selectedFile);
        formData.delete('image'); // Clear previous image data
        formData.delete('name');
        const newFormData = new FormData(); // Create a new FormData object
        newFormData.append('image', selectedFile);
        newFormData.append('name', name);
        console.log(newFormData.get('image')); // Log the 'image' field
        console.log(newFormData.get('name'));  // Log the 'name' field

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

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" style={{ width: "60px", height: "60px" }}>
                    <img src={logo} style={{ width: "100%", height: "100%" }} alt='logo' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link active" aria-current="page" >
                                <Link style={{ textDecoration: "none", }} className='linkColor' to='/'>Home</Link>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link active" aria-current="page"><Link style={{
                                textDecoration: "none",

                            }} className='linkColor' to='/users'>Users</Link></span>
                        </li>
                        {!login ? (
                            <li className="nav-item">
                                <span className="nav-link" >
                                    <Link style={{
                                        textDecoration: "none",
                                    }} className='linkColor' to='/login'>Login</Link>
                                </span>
                            </li>
                        ) : (
                            <li className="nav-item" onClick={() => handleLogout()}>
                                <span className="nav-link linkColor" style={{ cursor: "pointer" }}>
                                    Logout
                                </span>
                            </li>
                        )}
                        {isAdmin && (
                            <React.Fragment>

                                <li className="nav-item">
                                    <span className="nav-link " aria-disabled="true"><Link style={{
                                        textDecoration: "none",
                                    }} className='linkColor' to='/craeteProduct'>Add New Products</Link></span>
                                </li>
                                <button type="button" className="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add New Slider
                                </button>
                            </React.Fragment>
                        )
                        }
                    </ul>
                    <form className="d-flex w-50" role="search">
                        <div className='w-75 me-2'>
                            <input className="form-control me-2 serchBar" id='searchedTxt' type="search" placeholder="Search" aria-label="Search" />
                            {filterList.length > 0 && (
                                <div className='p-3 rounded-bottom bg-gradient position-absolute' style={{ backgroundColor: "#94a3b8", width: "35%", zIndex: 1, overflowY: "auto", }}>
                                    {filterList.map((item, key) => (
                                        <span className='d-flex flex-row p-2' style={{ width: "100%" }} onClick={() => getProductByid(item)}>
                                            <img width={50} height={30} src={item.productImage} alt='ProductImage' />&nbsp;&nbsp;&nbsp;&nbsp;
                                            <b> {item.name}</b>
                                        </span>
                                    ))}
                                </div>)}
                        </div>
                        <button className="btn btn-outline-success" onClick={handleFilter}>Search</button>
                        <div className='nightModeBtn'>
                            {isLightMode ? (
                                <MdDarkMode onClick={() => changeMode()} />) :
                                (
                                    <MdOutlineLightMode onClick={() => changeMode()} />
                                )}
                        </div>
                    </form>
                </div>
            </div>


            {/* new Slider Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New Slider Image</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='col-lg-12 col-sm-10'>
                                <input type='text' id='SliderName' className="form-control p-1 mb-3" placeholder='Enter Slider Name' />
                                <input type='file' id='sliderFile' className="form-control p-1" accept="image/*" onChange={(e) => handleSliderImage(e)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id='closeSliderModal' data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSaveSlider()} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </nav>
    );
};

export default Navbar;
