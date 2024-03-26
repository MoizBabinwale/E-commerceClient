import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    var cartItem = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItem);
  }, []);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
