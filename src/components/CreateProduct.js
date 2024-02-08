import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CreateProductApi } from "../actions/ProductActions";
import man from "../assets/man.jpg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const isCreatedPro = useSelector((state) => state.createdproduct);
  useEffect(() => {
    if (isCreatedPro.isCreatd) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Created Successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      isCreatedPro.isCreatd = null;
      navigate("/");
    }
  }, [isCreatedPro]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(CreateProductApi({ name, description, price, quantity, image }));
    } catch (error) {
      console.error("Error creating product:", error.response.data);
    }
  };

  const selectedImage = (e) => {
    console.log(e.target.files[0]);
    var file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error: ", error);
    };
  };
  return (
    <div className="divHideScroll pt-20 bg-[#f9faf5]">
      <div className="row ">
        <div className="col-lg-6">
          <img src={man} alt="" />
        </div>
        <div className="col-lg-6">
          <h2 style={{ color: "black", fontVariant: "all-petite-caps" }}>Create Product</h2>
          <div className="col-lg-8 p-2">
            <input type="file" className="form-control" accept="image/*" id="selectedImg" onChange={(e) => selectedImage(e)} name="img" />
          </div>
          <div className="col-lg-8  p-2 m-2">
            <label className="mb-2">Product Name</label>
            <input type="text" className="form-control" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-lg-8 p-2 m-2">
            <label className="mb-2">Description</label>
            <input type="text" className="form-control" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="col-lg-8 p-2 m-2">
            <label className="mb-2">Quantity</label>
            <input type="number" className="form-control" placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="col-lg-8 p-2 m-2">
            <label className="mb-2">Prize</label>
            <div className="input-group">
              <input type="number" placeholder="Enter Prize" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" style={{ WebkitAppearance: "textfield", MozAppearance: "textfield" }} onChange={(e) => setPrice(e.target.value)} />
              <span className="input-group-text">$</span>
              <span className="input-group-text">{price}.00</span>
            </div>
          </div>
          <div className="col-lg-8 d-flex p-2  justify-content-end">
            <button className="btn w-full font-semibold btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
