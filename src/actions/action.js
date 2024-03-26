// actions.js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SETADMIN, SIGNUPSUCCESS, SIGNUPFAIL, SIGNUPREQUEST, FETCHALLUSER } from "../Constants/Constant";
import axios from "axios";
import { APICONSTANTS } from "../Constants/ApiConstant";
// import { setCurrentUser } from './currentUser';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (responseData) => ({
  type: LOGIN_SUCCESS,
  payload: { responseData },
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const signUpSuccess = (responseData) => ({
  type: SIGNUPSUCCESS,
  payload: { responseData },
});
export const signUpRequest = () => ({
  type: SIGNUPREQUEST,
});
export const signUpFail = () => ({
  type: SIGNUPFAIL,
});
export const setAdmin = (isAdmin) => ({
  type: SETADMIN,
  payload: isAdmin,
});

export const fetchAllUsers = (responseData) => ({
  type: FETCHALLUSER,
  payload: { responseData },
});
export const login = (userEmail, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await axios.post(APICONSTANTS.API + "/login", {
        userEmail,
        password,
      });
      var currentUserData = response.data.data;
      localStorage.setItem("Profile", currentUserData);
      var isAdmin = currentUserData.isAdmin;
      if (isAdmin) {
        localStorage.setItem("isAdmin", isAdmin);
        dispatch(setAdmin(isAdmin));
      }
      dispatch(loginSuccess(response));
    } catch (error) {
      // Handle error and dispatch failure action
      dispatch(loginFailure());
    }
  };
};

export const singUp = (name, userEmail, password, isAdmin) => {
  return async (dispatch) => {
    try {
      dispatch(signUpRequest());
      const response = await axios.post(
        APICONSTANTS.API + "/signup",
        JSON.stringify({
          name,
          userEmail,
          password,
          isAdmin,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        dispatch(signUpSuccess(response.data));
      }
    } catch (error) {
      // Handle error and dispatch failure action
      dispatch(signUpFail());
    }
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(APICONSTANTS.API + "/getAllUser");
      dispatch(fetchAllUsers(response.data));
    } catch (error) {
      // Handle error and dispatch failure action
      console.log("error", error);
    }
  };
};

export const handleLogout = () => {
  localStorage.removeItem("Profile");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("expireTime");
  localStorage.removeItem("cart");
  window.location.reload();
};
