import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/ProductActions'
import { getAllUser } from '../actions/action'
import Slider from './Slider'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'

function Home() {
    const [availableProduct, setAvailableProduct] = useState([])
    const adminStatus = useSelector(state => state.setadmin)
    useEffect(() => {
        if (adminStatus.isAdminvalue) {
            var userData = JSON.parse(localStorage.getItem("Profile"))
        }
    }, [adminStatus])
    const dispatch = useDispatch()
    useEffect(() => {
        getAllProducts()
        dispatch(getAllUser())
    }, [])
    const products = useSelector(state => state.allproduct)
    const allUsers = useSelector(state => state.fetchallusers)
    useEffect(() => {
        if (products.products) {
            var userArray = allUsers.list.data
            var productArray = products.products.data.products
            for (const i in productArray) {
                var userName = userArray.find(item => item._id === productArray[i].userId)
                productArray[i].userName = userName.name
            }
            setAvailableProduct(productArray)
        }

    }, [products, allUsers])

    const getAllProducts = () => {
        dispatch(getProducts())
    }
    return (
        <div>
            {products == {} ? (
                <>
                    Add Some Products ...
                </>

            ) : (
                <div className='row mt-2'>
                    <div className='w-100 p-0'>
                        <Slider />
                    </div>
                    <div>
                        <Confetti wind={0} style={{ inset: "auto" }} width={window.innerWidth} height={95} />

                        <center className="p-2 mt-2 " style={{ backgroundColor: "gold" }}>
                            <h2>We Bring Exciting Prizes!!</h2>

                            {/* <!-- Add more confetti elements as needed --> */}
                        </center>
                    </div>
                    <div className='row m-2'>
                        {availableProduct.map((item, key) => (
                            <div className='col-lg-3 d-flex col-md-3 col-sm-2 p-2'>
                                <div className="card w-100" key={key}>
                                    <div className="card-header userNameClr">
                                        <b> Posted By &nbsp;:&nbsp; {item.userName}</b>
                                    </div>
                                    <div className="card-body">
                                        <div className='row' >
                                            <div className='col-lg-5 '>
                                                <img className='shadow-lg' src={item.productImage} alt='ProductImg' style={{ borderRadius: "20px", height: "100px", width: "140px" }} />
                                            </div>
                                            <div className='col-lg-7'>
                                                <h5 id='titleName' style={{ color: "black" }} >{item.name}</h5>
                                                <p style={{ color: "black" }}>{item.description}</p>
                                                <Link to="/" className="btn btn-dark  p-2 m-2" style={{ zIndex: 2 }}>See Details</Link>
                                                <Link to="/" className="btn btn-success m-2">Edit</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default Home
