import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addNewSlider, getAllSliders } from "../actions/ProductActions";

function Modal({ isVisible, onClose }) {
  const [selectedFile, setSelectedFile] = useState(new FormData());
  const dispatch = useDispatch();

  const handleClose = e => {
    if (e.target.id === "wrapper") onClose();
  };

  const handleSliderImage = e => {
    var file = e.target.files[0];
    // Handle the case where no file is selected
    if (!file) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please Select Image To Upload!",
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    setSelectedFile(file);
  };

  const handleSaveSlider = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      var name = document.getElementById("slideName").value;
      formData.append("name", name);
      const response = await dispatch(addNewSlider(formData));
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Slider Uplaoded Successfully!",
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          dispatch(getAllSliders());
          document.getElementById("wrapper").click();
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isVisible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <p>Add New Slider Image</p>
          <input type="file" onChange={e => handleSliderImage(e)} />
          <input className="border bg-slate-200" type="text" id="slideName" />
          <div className="flex justify-end">
            <button
              className="bg-blue-700  hover:bg-blue-800 btn p-2 flex flex-end"
              onClick={handleSaveSlider}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
