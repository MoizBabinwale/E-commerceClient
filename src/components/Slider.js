import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSliders } from '../actions/ProductActions'

function Slider() {

    const [slideList, setSlideList] = useState([])
    const dispatch = useDispatch()
    const allSlider = useSelector(state => state.slideroptions)
    useEffect(() => {
        dispatch(getAllSliders())
    }, [])
    useEffect(() => {
        if (allSlider.slides) {
            console.log("jj", allSlider);
            var list = allSlider.slides.sliders
            setSlideList(list)
        }
    }, [allSlider])

    const baseUrl = "http://localhost:5000/"
    return (
        <div style={{ height: "480px", position: "inherit" }}>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ height: "inherit" }}>
                {/* <div className="carousel-inner" style={{ height: "100%", display: "flex" }}> */}
                <div className="carousel-inner" style={{ height: "100%", display: "flex" }}>
                    {slideList.map((item, key) => (
                        <div key={key} className={`carousel-item ${key === 0 ? 'active' : ''}`}>
                            <img
                                className="d-block w-100 c-img"
                                style={{ height: "100%" }}
                                src={item.image}
                                alt={`Slide ${key + 1}`}
                            />
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

    )
}




export default Slider
