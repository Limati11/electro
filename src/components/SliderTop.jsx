import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SliderMobile() {
  const [images, setImages] = useState([
    '/assets/home-slider/1b.webp',
    '/assets/home-slider/2b.webp',
    '/assets/home-slider/3b.webp',
    '/assets/home-slider/4b.webp'
  ]);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 480px)');
    const handleScreenResize = (e) => {
      if (e.matches) {
        setImages([
          '/assets/home-slider/home-slider-1.webp',
          '/assets/home-slider/home-slider-2.webp',
          '/assets/home-slider/home-slider-3.webp',
          '/assets/home-slider/home-slider-4.webp'
        ]);
      } else {
        setImages([
          '/assets/home-slider/1b.webp',
          '/assets/home-slider/2b.webp',
          '/assets/home-slider/3b.webp',
          '/assets/home-slider/4b.webp'
        ]);
      }
    };

    mql.addEventListener('change', handleScreenResize);

    return () => {
      mql.removeEventListener('change', handleScreenResize);
    };
  }, []);

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
      {images.map((image, index) => (
        <div className='slider-top-image-containeri' key={index}>
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
}
