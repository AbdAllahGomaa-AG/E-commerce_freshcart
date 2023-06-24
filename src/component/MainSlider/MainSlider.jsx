import React from "react";
import Slider from "react-slick";
import slide1 from "../../image/Slider/1-1.png";
import slide2 from "../../image/Slider/2-2.png";
import slide3 from "../../image/Slider/3-6.png"
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <>
      <div className="container mt-5 p-4">
        <Slider {...settings} autoplaySpeed={4000}>
          <img src={slide1} alt="slide1" className="" />
          <img src={slide2} alt="slide1" className="img-fluid" />
          <img src={slide3} alt="slide1" className="img-fluid" />
        </Slider>
      </div>
    </>
  );
}
