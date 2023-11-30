import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ImgSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          src="img/1.png"
          style={{
            width: "100%",
            height: "400px",
          }}
        />
      </div>
      <div>
        <img
          src="img/2.png"
          style={{
            width: "100%",
            height: "400px",
          }}
        />
      </div>
      <div>
        <img
          src="img/3.png"
          style={{
            width: "100%",
            height: "400px",
          }}
        />
      </div>
      <div>
        <img
          src="img/4.png"
          style={{
            width: "100%",
            height: "400px",
          }}
        />
      </div>
    </Slider>
  );
};

export default ImgSlider;
