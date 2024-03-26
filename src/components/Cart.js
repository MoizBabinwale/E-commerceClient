import React, { useEffect, useState } from "react";
import { useCart } from "../context/cardContext";
import { useAuth } from "../context/Auth";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import Swal from "sweetalert2";
import axios from "axios";
import { APICONSTANTS } from "../Constants/ApiConstant";
import image from "../assets/logo.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { cart, setCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (cart.length > 0) {
      const updatedCart = cart.reduce((acc, item) => {
        const existingItemIndex = acc.findIndex((cartItem) => cartItem._id === item._id);
        if (existingItemIndex !== -1) {
          acc[existingItemIndex].qty += 1;
        } else {
          acc.push({ ...item, qty: 1 });
        }
        return acc;
      }, []);
      setCartItems(updatedCart);
      const totalPrice = updatedCart.reduce((acc, item) => acc + item.prize * item.qty, 0);
      setTotal(totalPrice);
    } else {
      setCartItems([]);
      setTotal(0);
    }
  }, [cart]);

  const handleQuantityChange = (id, increment) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        if (item.qty === 1 && !increment) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Quantity can't be less than 1!",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
        if (increment) {
          setCart([...cart, item]);
        } else {
          var index = cart.indexOf(item._id);
          if (index > -1) {
            cart.splice(index, 1);
          }
          setCart(cart);
        }
        return { ...item, qty: increment ? item.qty + 1 : item.qty - 1 };
      }
      return item;
    });
    const totalPrice = updatedCart.reduce((acc, item) => acc + item.prize * item.qty, 0);
    setTotal(totalPrice);
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    setCart(updatedCart);
  };

  const handlePayment = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(APICONSTANTS.baseUrl + "get/paymentKey");

      const orderProductarr = [];
      const {
        data: { order },
      } = await axios.post(APICONSTANTS.API + "/payment/createOrder", { orderProductarr }, { headers: { "Content-Type": "application/json" } });
      console.log("order ", order);
      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: image,
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: APICONSTANTS.API + "/payment/paymentVerification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#222222",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <div className="mt-20">
      {cartItems.length === 0 ? (
        <div className="text-center">Your cart is empty</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img className="md:w-full md:h-[320px] w-full h-[300px]" src={item.productImage} alt="Product Image" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <p className="text-gray-700 text-base">Price: ${item.prize}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <button onClick={() => handleQuantityChange(item._id, false)} className="text-gray-600 focus:outline-none">
                        <CiSquareMinus />
                      </button>
                      <span className="mx-2">{item.qty}</span>
                      <button onClick={() => handleQuantityChange(item._id, true)} className="text-gray-600 focus:outline-none">
                        <CiSquarePlus />
                      </button>
                    </div>
                    <button onClick={() => handleRemoveItem(item._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-xl font-bold">Grand Total: ${total.toFixed(2)}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4" onClick={() => handlePayment()}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
