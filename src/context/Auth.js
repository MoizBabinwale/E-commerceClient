import React, { createContext, useState, useContext } from "react";
import { handleLogout } from "../actions/action";

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setAuth = (value) => {
    setIsLoggedIn(value);
    if (!value) {
      handleLogout();
    }
  };

  return <AuthContext.Provider value={{ isLoggedIn, setAuth }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
