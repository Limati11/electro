import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SliderMobile() {
  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
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
        <img src="/assets/home-slider/home-slider-1.webp" alt="Image 1" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-2.webp" alt="Image 2" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-3.webp" alt="Image 3" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-4.webp" alt="Image 4" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-5.webp" alt="Image 5" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-6.webp" alt="Image 6" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-7.webp" alt="Image 6" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-8.webp" alt="Image 6" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-9.webp" alt="Image 6" />
      </div>
      <div>
        <img src="/assets/home-slider/home-slider-10.webp" alt="Image 6" />
      </div>
    </Slider>
  );
}
