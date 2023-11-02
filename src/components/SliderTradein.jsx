import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SliderMobile() {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3500,
    infinite: true,
    dots: false,
    arrows: false,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="/assets/home-tradein/home-tradein-iphones.jpg" alt="Image 1" />
      </div>
      <div>
        <img src="/assets/home-tradein/home-tradein.jpg" alt="Image 2" />
      </div>
    </Slider>
  );
}
