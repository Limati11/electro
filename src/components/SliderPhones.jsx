import React from 'react';
import { Link, useSearchParams } from "react-router-dom"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "/src/pages/home.scss"

import { getPhones } from "./api.js";




export default function PhonesSlider() {
  // const [searchParams, setSearchParams] = useSearchParams()
  const [phones, setPhones] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  // const typeFilter = searchParams.get("type")

  React.useEffect(() => {
    async function loadPhones() {
        setLoading(true)
        try {
            const data = await getPhones()
            setPhones(data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    loadPhones()
  }, [])

    
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
                {phone_data.name}
                {phone_data.model}
            </h3>
              <span>{phone_data.memory}/{phone_data.ram}GB</span>
            <p className='phones-slider-inner-info'>
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
