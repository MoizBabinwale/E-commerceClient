import { useSelector } from "react-redux";
import { ALLPRODUCT, FILTERPRODUCT, GETALLSLIDERS, PRODUCTCREATED, SLIDERCREATED, PRODUCTDETAIL, PRODUCTDATA } from "../Constants/Constant";
import axios from "axios";
import { useEffect } from "react";

const API = "http://localhost:5000/api/products";
const SLIDERAPI = "http://localhost:5000/api/sliders";

export const ProductCreated = () => ({
  type: PRODUCTCREATED,
});

var token;
if (localStorage.Profile !== "undefined") {
  var profileData = JSON.parse(localStorage.getItem("Profile"));

  if (profileData && profileData.token) {
    token = profileData.token;
  }
}

export const CreateProductApi = ({ name, description, price, quantity, image }) => {
  return async (dispatch) => {
    try {
      const ProductData = JSON.stringify({
        name,
        description,
        prize: Number.parseInt(price),
        quantity: Number.parseInt(quantity),
        productImage: image,
      });
      const response = await axios.post(API + "/create", ProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        dispatch(ProductCreated());
      }
    } catch (error) {
      console.log("erro ", error);
    }
  };
};

export const allproducts = (responseData) => ({
  type: ALLPRODUCT,
  payload: { responseData },
});

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API + "/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(allproducts(response));
    } catch (error) {
      console.log("error ", error);
    }
  };
};

export const filterOptions = (responseData) => ({
  type: FILTERPRODUCT,
  payload: { responseData },
});
export const singleProductData = (responseData) => ({
  type: PRODUCTDATA,
  payload: { responseData },
});

export const getSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const productID = JSON.stringify({
        id: productId,
      });
      const response = await axios.post(API + "/getdetail", productID, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(singleProductData(response));
    } catch (error) {
      console.log("error ", error);
    }
  };
};

export const serchedFunction = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API + "/filter/" + name.searchedValue);
      dispatch(filterOptions(response));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sliderImages = (responseData) => ({
  type: GETALLSLIDERS,
  payload: { responseData },
});
export const getAllSliders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(SLIDERAPI + "/");
      dispatch(sliderImages(response.data));
    } catch (error) {
      console.log("error ", error);
    }
  };
};

export const sliderCreated = (responseData) => ({
  type: SLIDERCREATED,
  payload: { responseData },
});

export const addNewSlider = (formData) => {
  console.log(formData);
  return async (dispatch) => {
    try {
      const response = await axios.post(SLIDERAPI + "/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // dispatch(sliderCreated(response.data.sliders))
        return response;
      }
    } catch (error) {
      console.log("error ", error);
      throw error;
    }
  };
};

export const deleteSldier = (ID) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(SLIDERAPI + "/deleteSlider/" + ID);
      console.log(response);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
};
