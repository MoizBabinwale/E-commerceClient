import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/ProductActions";
import { getAllUser } from "../actions/action";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cardContext";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth";

function Home() {
  const [availableProduct, setAvailableProduct] = useState([]);
  const { cart, setCart } = useCart();
  const { isLoggedIn } = useAuth();
  let navigate = useNavigate();
  const adminStatus = useSelector((state) => state.setadmin);
  useEffect(() => {
    if (adminStatus.isAdminvalue) {
      var userData = JSON.parse(localStorage.getItem("Profile"));
    }
  }, [adminStatus]);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProducts();
    dispatch(getAllUser());
  }, []);
  const allUsers = useSelector((state) => state.fetchallusers);
  const products = useSelector((state) => state.allproduct);
  useEffect(() => {
    if (products.products) {
      var productArray = products.products.data.products;
      // if()
      var userArray = allUsers.list.data;
      for (const i in productArray) {
        var userName = userArray.find((item) => item._id === productArray[i].userId);
        productArray[i].userName = userName.name;
      }
      setAvailableProduct(productArray);
    }
  }, [products]);

  const getAllProducts = () => {
    dispatch(getProducts());
  };

  const handleCart = (item) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setCart([...cart, item]);
      localStorage.setItem("cart", JSON.stringify([...cart, item]));
      toast.success("Item Added to Cart");
    }
  };

  return (
    <div className="pt-16">
      {products == {} ? (
        <>Add Some Products ...</>
      ) : (
        <div className="row">
          <div className="w-100 p-0 flex flex-col md:flex-row md:flex  mx-3 justify-around">
            <Slider />
          </div>
          <div className="flex w-full md:mt-0 mt-3 md:w-full ">
            <div className="relative flex p-2 gap-3 rounded overflow-hidden shadow-lg">
              <div className="relative h-68 md:w-[50%] rounded-sm">
                <img
                  className="w-[35%] md:w-[100%] md:justify-center md:h-full object-cover object-center transition-opacity duration-300 ease-in-out hover:opacity-50 rounded-sm"
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
                  alt="Product Image"
                />
                <div className="opacity-5 absolute inset-0 flex md:justify-center items-center hover:bg-black hover:bg-opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100">
                  <div className="text-white text-center">
                    <h3 className="text-lg font-bold mb-2">HeadPhone</h3>
                    <p className="text-base">Price: $5.00</p>
                  </div>
                </div>
              </div>
              <div className="relative h-68 md:w-[50%] rounded-sm">
                <img
                  className="w-[35%] md:w-[100%] md:h-full object-cover object-center transition-opacity duration-300 ease-in-out hover:opacity-50 rounded-sm"
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Product Image"
                />
                <div className="opacity-5 absolute inset-0 flex md:justify-center items-center hover:bg-black hover:bg-opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100">
                  <div className="text-white text-center">
                    <h3 className="text-lg font-bold mb-2">Nike</h3>
                    <p className="text-base">Price: $12.56</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <center className="p-2 mt-2 " style={{ backgroundColor: "gold" }}>
              <h2>We Bring Exciting Prizes!!</h2>
            </center>
          </div>
          <div className="px-2 md:gap-2  md:max-w-full md:flex-shrink-0 md:flex md:flex-wrap md:flex-row md:items-start m-2 items-center flex flex-col w-full md:justify-normal">
            {availableProduct.map((item, key) => (
              <div className="max-w-sm rounded-lg overflow-hidden shadow-md mt-2 md:w-[24%] w-full cursor-pointer" key={key}>
                <div onClick={() => navigate(`/product-details/${item._id}`)}>
                  <img className="md:w-full md:h-[320px] w-full h-[300px]" src={item.productImage} alt="Product Image" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2"> {item.name}</div>
                    <p className="text-gray-700 text-base">Price : {item.prize}</p>
                    <p className="text-gray-700 text-base">Posted by : {item.userName.toUpperCase()}</p>
                  </div>
                </div>
                <div className="px-6 pt-2 pb-2  ">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      handleCart(item);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
