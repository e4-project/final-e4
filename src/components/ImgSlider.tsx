import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImgSlider = () => {
  const settings = {
    arrows:false,           // 양 옆에있는 next prev button
    dots: true,             // 하단에 있는 동그라미 버튼                        
    infinite: true,         // 무한반복 
    speed: 500,             // 슬라이드 넘어갈때 속도 
    slidesToShow: 1,        // 한 번에 볼 수 있는 슬라이드 개수
    slidesToScroll: 1,      // 한 번에 넘어가는 슬라이드 수 
    autoplay: true,         // 자동으로 슬라이드 넘어가게 해줌
    autoplaySpeed: 2500,    // 슬라이드 자동 넘기기 시간(1000ms = 1초)
    fade: true,             // 크로스페이드 모션 사용 여부 
  };

   const img = [
    
   ]
  return (
    <Slider {...settings}>
      <div>
        <img
          src="img/1.png"
          style={{
            width: "100%",
            height: "350px"
  
          }}
        />
      </div>
      <div>
        <img
          src="img/2.png"
          style={{
            width: "100%",
            height: "350px"
          }}
        />
      </div>
      <div>
        <img
          src="img/3.png"
          style={{
            width: "100%",
            height: "350px"
          }}
        />
      </div>
      <div>
        <img
          src="img/4.png"
          style={{
            width: "100%",
            height: "350px"
          }}
        />
      </div>
    </Slider>
  );
};

export default ImgSlider;
