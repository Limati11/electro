import React from "react"
import { Link } from "react-router-dom"
import "./home.scss"
import SliderTop from "../components/SliderTop"
import SliderPhones from "../components/SliderPhones"
import SliderTradein from "../components/SliderTradein"
// Icons
import { TbDiscount2, TbShieldCheck, TbTruckDelivery } from "react-icons/tb"
import { BsPhoneFlip } from "react-icons/bs"
import { MdPayment, MdStars } from "react-icons/md"



export default function Home() {

    return (
        <div className="home-container">
            <div className=" home-container-slider">
                <SliderTop />
            </div>

            <div className="container home-container-products">
                <div className="up">
                    <Link className="casti-link" to="/gadgeturi">
                        <div className="casti">
                            <img src="/assets/home-gadgets/home-casti.webp" alt=""></img>
                            <h3>Căști Bluetooth</h3>
                        </div>
                    </Link>
                </div>
                <div className="down">
                    <Link className="watch-link" to="/gadgeturi">
                        <div className="watch">
                            <img src="/assets/home-gadgets/home-ceasuri.webp" alt=""></img>
                            <h3>Smartwatch-uri</h3>
                        </div>
                    </Link>
                    <Link className="boxe-link" to="/gadgeturi">
                        <div className="boxe">
                            <img src="/assets/home-gadgets/home-boxe.jpg" alt=""></img>
                            <h3>Boxe</h3>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="container home-container-tradein">
                <Link className="tradein-image" to="/tradein" >
                    <SliderTradein />
                </Link>
            </div>

            <div className="container home-container-gaming">
                <Link className="gaming-link" to="/gaming" >
                <div className="gaming-div"></div>
                </Link>
            </div>

            <div className="container home-container-phones">
                <SliderPhones />
            </div>

            <div className="home-container-info">
                <div className="home-container-info-one">
                    <div className="home-container-info-inner">
                        <TbDiscount2 className="info-icons" />
                        <p>Condiții avantajoase</p>
                    </div>
                    <div className="home-container-info-inner">
                        <TbTruckDelivery className="info-icons" />
                        <p>Livrare gratuită</p>
                    </div>
                    <div className="home-container-info-inner">
                        <TbShieldCheck className="info-icons" />
                        <p>2 ani garanție</p>
                    </div>
                </div>
                <div className="home-container-info-two">
                    <div className="home-container-info-inner">
                        <MdPayment className="info-icons" />
                        <p>Achitarea online</p>
                    </div>
                    <div className="home-container-info-inner">
                        <BsPhoneFlip className="info-icons" />
                        <p>Asigurarea Dispozitivului</p>
                    </div>
                    <div className="home-container-info-inner">
                        <MdStars className="info-icons" />
                        <p>Distribuitor oficial</p>
                    </div>
                 </div>
            </div>
        </div>
    )
}