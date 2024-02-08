// reducers.js
import { combineReducers } from "redux";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUPSUCCESS, SIGNUPFAIL, SIGNUPREQUEST, FETCHALLUSER, SETADMIN, PRODUCTCREATED, ALLPRODUCT, FILTERPRODUCT, GETALLSLIDERS, PRODUCTDATA } from "../Constants/Constant";

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  responseData: null, // Add responseData property to your initial state
  // ...other properties
};
const initialSingupState = {
  isSignup: false,
  isLoading: false,
  responseData: null,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      localStorage.setItem("Profile", JSON.stringify({ ...action.payload.responseData.data }));
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        responseData: action.payload.responseData,
      };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const signupReducer = (state = initialSingupState, action) => {
  switch (action.type) {
    case SIGNUPREQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUPSUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignup: true,
        responseData: action.payload,
      };

    case SIGNUPFAIL:
      return {
        ...state,
        isLoading: false,
        isSignup: false,
      };
    default:
      return state;
  }
};
const initialUsers = {
  list: null,
};
const fetchAllUsers = (state = initialUsers, action) => {
  switch (action.type) {
    case FETCHALLUSER:
      return {
        ...state,
        list: action.payload.responseData,
      };

    default:
      return state;
  }
};

const initialAdminState = {
  isAdminvalue: false,
};
const setAdminData = (state = initialAdminState, action) => {
  switch (action.type) {
    case SETADMIN:
      return {
        ...state,
        isAdminvalue: action.payload.data,
      };
    default:
      return state;
  }
};

const initialProduct = {
  isCreatd: false,
};
const CreateProduct = (state = initialProduct, action) => {
  switch (action.type) {
    case PRODUCTCREATED:
      return {
        ...state,
        isCreatd: true,
      };
    default:
      return state;
  }
};

var products = {};
const AllProducts = (state = products, action) => {
  switch (action.type) {
    case ALLPRODUCT:
      return {
        ...state,
        products: action.payload.responseData,
      };
    default:
      return state;
  }
};

const initialFilter = {
  filterData: null,
};

const filterOptions = (state = initialFilter, action) => {
  switch (action.type) {
    case FILTERPRODUCT:
      return {
        ...state,
        filterData: action.payload.responseData,
      };
    default:
      return state;
  }
};
const productData = {
  productData: null,
};

const singleProductData = (state = productData, action) => {
  switch (action.type) {
    case PRODUCTDATA:
      return {
        ...state,
        productData: action.payload.responseData.data,
      };
    default:
      return state;
  }
};

var slidesData = {
  slides: null,
};

const sliderOptions = (state = slidesData, action) => {
  switch (action.type) {
    case GETALLSLIDERS:
      return {
        ...state,
        slides: action.payload.responseData,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  fetchallusers: fetchAllUsers,
  setadmin: setAdminData,
  createdproduct: CreateProduct,
  allproduct: AllProducts,
  filteroptions: filterOptions,
  slideroptions: sliderOptions,
  singleProductData: singleProductData,
  // Add more reducers here if needed
});

export default rootReducer;
