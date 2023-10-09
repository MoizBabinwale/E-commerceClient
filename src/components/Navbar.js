import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { serchedFunction } from '../actions/ProductActions';
import Swal from 'sweetalert2'

const Navbar = () => {
    const [login, setLogin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [loginTime, setLoginTime] = useState("");
    const [filterList, setFilterList] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        var userData = JSON.parse(localStorage.getItem("Profile"))
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
            if (currentTime > expirationTime) {
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

    const getProductByid = (e) => {
        var selectedValue = e.target.value

    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link active" aria-current="page" ><Link style={{
                                textDecoration: "none",
                                color: "#333"
                            }} to='/'>Home</Link></span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link active" aria-current="page"><Link style={{
                                textDecoration: "none",
                                color: "#333"
                            }} to='/users'>Users</Link></span>
                        </li>
                        {!login ? (
                            <li className="nav-item">
                                <span className="nav-link" >
                                    <Link style={{
                                        textDecoration: "none",
                                        color: "#333"
                                    }} to='/login'>Login</Link>
                                </span>
                            </li>
                        ) : (
                            <li className="nav-item" onClick={() => handleLogout()}>
                                <span className="nav-link" style={{ cursor: "pointer" }}>
                                    Logout
                                </span>
                            </li>
                        )}
                        {isAdmin &&
                            <li className="nav-item">
                                <span className="nav-link " aria-disabled="true"><Link style={{
                                    textDecoration: "none",
                                    color: "#444"
                                }} to='/craeteProduct'>Add New Products</Link></span>
                            </li>
                        }
                    </ul>
                    <form className="d-flex w-50" role="search">
                        <div className='w-75 me-2'>
                            <input className="form-control me-2" id='searchedTxt' type="search" placeholder="Search" aria-label="Search" />
                            {filterList.length > 0 && (
                                <div className='p-3 rounded-bottom bg-dark text-white position-absolute' style={{ width: "35%", zIndex: 1, overflowY: "auto", }}>
                                    {filterList.map((item, key) => (
                                        <span className='d-flex flex-row p-2' style={{ width: "100%" }} onClick={(e) => getProductByid(e)} value={item._id}>
                                            <img width={50} height={30} src={item.productImage} alt='ProductImage' />&nbsp;&nbsp;&nbsp;&nbsp;
                                            {item.name}
                                        </span>
                                    ))}
                                </div>)}
                        </div>
                        <button className="btn btn-outline-success" onClick={handleFilter}>Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
