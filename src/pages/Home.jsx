import React from "react"
import { Link } from "react-router-dom"
import "./home.css"
import SliderMobile from "../components/SliderMobile.jsx"
import PhoneSlider from "../components/PhoneSlider"


export default function Home() {

    return (
        <div className="home-container">
            <div className=" home-container-slider">
                <SliderMobile />
            </div>
            
            <div className="container home-container-tradein">
                <Link className="tradein-image" to="/tradein" >
                    <img src="public/home-tradein.jpg" alt=""></img>
                </Link>
            </div>
            <div className="container home-container-products">
                <div className="up">
                    <Link className="casti-link" to="/gadgeturi">
                        <div className="casti">
                            <img src="public/home-casti.webp" alt=""></img>
                            <h3>Căști Bluetooth</h3>
                        </div>
                    </Link>
                </div>
                <div className="down">
                    <Link className="watch-link" to="/gadgeturi">
                        <div className="watch">
                            <img src="public/home-ceasuri.webp" alt=""></img>
                            <h3>Smartwatch-uri</h3>
                        </div>
                    </Link>
                    <Link className="boxe-link" to="/gadgeturi">
                        <div className="boxe">
                            <img src="public/home-boxe.jpg" alt=""></img>
                            <h3>Boxe</h3>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="container home-container-phones">
                <PhoneSlider />
            </div>
        </div>
    )
}