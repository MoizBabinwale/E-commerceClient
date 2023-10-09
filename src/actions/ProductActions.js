import { ALLPRODUCT, FILTERPRODUCT, GETALLSLIDERS, PRODUCTCREATED } from "../Constants/Constant";
import axios from 'axios';

const API = 'http://localhost:5000/api/products'
const SLIDERAPI = 'http://localhost:5000/api/sliders'

export const ProductCreated = () => ({
    type: PRODUCTCREATED,
})
var profileData = JSON.parse(localStorage.getItem("Profile"))
if (profileData) {
    var token = profileData.token
}
export const CreateProductApi = ({ name, description, price, quantity, image }) => {
    return async dispatch => {
        try {
            const ProductData = JSON.stringify({
                name,
                description,
                "prize": Number.parseInt(price),
                "quantity": Number.parseInt(quantity),
                "productImage": image
            })
            const response = await axios.post(API + '/create', ProductData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            dispatch(ProductCreated())
        } catch (error) {
            console.log("erro ", error);
        }
    }
}

export const allproducts = (responseData) => ({
    type: ALLPRODUCT,
    payload: { responseData }
})
export const getProducts = () => {
    return async dispatch => {
        try {
            const response = await axios.get(API + "/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            dispatch(allproducts(response))
        } catch (error) {
            console.log("error ", error);
        }
    }
}

export const filterOptions = (responseData) => ({
    type: FILTERPRODUCT,
    payload: { responseData }

})

export const serchedFunction = (name) => {
    return async dispatch => {
        try {
            const response = await axios.get(API + "/filter/" + name.searchedValue)
            dispatch(filterOptions(response))
        } catch (error) {
            console.log(error);
        }
    }
}

export const sliderImages = (responseData) => ({
    type: GETALLSLIDERS,
    payload: { responseData }
});
export const getAllSliders = () => {
    return async dispatch => {
        try {
            const response = await axios.get(SLIDERAPI + "/")
            console.log("lider", response);
            dispatch(sliderImages(response.data))
        } catch (error) {
            console.log("error ", error);

        }

    }
}