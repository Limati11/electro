import React from 'react';
import { Link } from "react-router-dom"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "/src/pages/home.css"

const phones = [
  {
    company: 'Apple ',
    name: 'Iphone',
    power: '8/256GB ',
    color: 'Black',
    price: '20000',
    imageUrl: 'public/home-slider-phones-iphone.jpg',
  },
  {
    company: 'Sapmsung ',
    name: 'A',
    power: '4/120GB ',
    color: 'Black',
    price: '10000',
    imageUrl: 'public/home-slider-phones-samsung.webp',
  },
  {
    company: 'Oppo ',
    name: 'S',
    power: '4/120GB ',
    color: 'White',
    price: '10000',
    imageUrl: 'public/home-slider-phones-oppo.webp',
  },
  {
    company: 'Xiaomi ',
    name: 'B',
    power: '6/250GB ',
    color: 'Red',
    price: '15000',
    imageUrl: 'public/home-slider-phones-xiaomi.webp',
  },
  {
    company: 'OnePlus',
    name: 'Nord',
    power: '6/250GB',
    color: 'Black',
    price: '18000',
    imageUrl: 'public\home-slider-phones-oneplus.webp',
  },
];

export default function PhonesSlider() {
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
    <div className="home-container-phones-slider">
      <h1 className='title-container'>Telefoane</h1>
      <Slider {...settings}>
        {phones.map((phone_data, index) => (
          <div key={index} className="home-container-phones-slider-inner">
            <img src={phone_data.imageUrl} alt={phone_data.name} />
            <h3>
                {phone_data.company}
                {phone_data.name}
            </h3>
            <p className='phones-slider-inner-info'>
              <span>{phone_data.power}</span>
              <span className='price'>{phone_data.price} lei</span>
            </p>
          </div>
        ))}
      </Slider>
      <Link to="/telefoane">
        <div className="btn-vezi-toate-container">
          <h3 className='btb-vezi-toate'>VEZI TOATE</h3>
        </div>
      </Link>
    </div>
  );
}
