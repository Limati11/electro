import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SliderMobile() {
  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
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
        <img src="src/public/assets/slider_mobile/0-Credit-750x680-RO-750x680.webp" alt="Image 1" />
      </div>
      <div>
        <img src="src/public/assets/slider_mobile/1eShop_750x680_TabFe_ro-750x680.webp" alt="Image 2" />
      </div>
      <div>
        <img src="src/public/assets/slider_mobile/3Xiaomi-12-750x680-RO-750x680.webp" alt="Image 3" />
      </div>
      <div>
        <img src="src/public/assets/slider_mobile/eShop_Cool-Black_750x680_ro-750x680.webp" alt="Image 4" />
      </div>
      <div>
        <img src="src/public/assets/slider_mobile/eShop-iPhone_14_Pro-750x680_ro-750x680.webp" alt="Image 5" />
      </div>
      <div>
        <img src="src/public/assets/slider_mobile/eShop-Reno10-750x680-RO-750x680.webp" alt="Image 6" />
      </div>
    </Slider>
  );
}
