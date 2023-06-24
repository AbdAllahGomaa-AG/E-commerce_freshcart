import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../BURL/BURL";
import Slider from "react-slick";

export default function Category() {
  const [Category, setCategory] = useState([]);
  const getAllCategory = () => {
    let { date } = axios.get(`${baseUrl}/categories`).then((data) => {
      // console.log(data.data.data);
      setCategory(data.data.data);
    });
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
  };
  return (
    <>
      <div className="container my-5 ">
        <h2>shop popular categories</h2>

        <Slider {...settings} autoplaySpeed={3000}>
          {Category.map((item) => {
            return (
              <div key={item._id}>
                <img
                  src={item.image}
                  alt="slide1"
                  className="w-100"
                  height={250}
                />
                <h5 className="mt-2">{item.name}</h5>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
