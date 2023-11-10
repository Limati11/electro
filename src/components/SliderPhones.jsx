import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./SliderPhones.scss"

import { getPhones } from "./api.js";




export default function PhonesSlider() {
  // const [searchParams, setSearchParams] = useSearchParams()
  const [phones, setPhones] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [slidesToShow, setSlidesToShow] = useState(1);

  // const typeFilter = searchParams.get("type")

  useEffect(() => {
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


  useEffect(() => {
    function handleResize() {
      // Adjust slidesToShow based on window width
      setSlidesToShow(window.innerWidth >= 1280 ? 5 : window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 480 ? 2 : 1);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) {
      return <h1>Loading...</h1>;
  }

  if (error) {
      return <h1>There was an error: {error.message}</h1>;
  }
    
  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    dots: false,
    arrows: true,
    speed: 2000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

 

  return (
    <div className="home-container-phones-slider">
      <h1 className='title-container'>Telefoane</h1>
      <Slider {...settings}>
          {phones.map((product, index) => (
            <div key={index} className="product-title">
              <Link  
                to={`/phones/${product.id}`}
                state={{
                // search: `?${searchParams.toString()}`,
                }}
              >
                <div className="product-info">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>
                      {product.company} {product.name} {product.model}
                  </h3>
                  <h4>
                      {product.memory}/{product.ram} GB
                  </h4>
                  <p>
                      {product.price}
                      <span> mdl</span>
                  </p>
                </div>
              </Link>
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
