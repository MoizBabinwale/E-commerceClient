import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSldier, getAllSliders } from "../actions/ProductActions";
import { RiDeleteBin5Line } from "react-icons/ri";
import { APICONSTANTS } from "../Constants/ApiConstant";

function Slider() {
  const [slideList, setSlideList] = useState([]);
  const dispatch = useDispatch();
  const allSlider = useSelector((state) => state.slideroptions);
  useEffect(() => {
    dispatch(getAllSliders());
  }, []);
  useEffect(() => {
    if (allSlider.slides) {
      var list = allSlider.slides.sliders;
      setSlideList(list);
    }
  }, [allSlider]);

  const deleteSliderImage = (item) => dispatch(deleteSldier(item._id));
  return (
    <div className="w-full rounded-md md:w-100" style={{ height: "480px", position: "inherit" }}>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ height: "inherit" }}>
        {/* <div className="carousel-inner" style={{ height: "100%", display: "flex" }}> */}
        <div className="carousel-inner rounded-md bg-black flex " style={{ height: "100%" }}>
          {slideList.map((item, key) => (
            <div key={key} className={`justify-center  carousel-item ${key === 0 ? "active" : ""}`}>
              <img className="d-block c-img   " style={{ height: "100%", width: "100%" }} src={APICONSTANTS.baseUrl + item.image} alt={`Slide ${key + 1}`} />
              <div style={{ position: "absolute", bottom: "10px", right: "30px", zIndex: 3, background: "transparent", cursor: "pointer", color: "red" }}>
                <RiDeleteBin5Line style={{ fontSize: "24px" }} onClick={() => deleteSliderImage(item)} />
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Slider;
