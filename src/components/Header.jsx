import React, { useState } from 'react';
import './header.scss';
import { Link, NavLink } from "react-router-dom";
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { AiOutlineCloseCircle, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { FiTablet } from 'react-icons/fi';
import { IoWatchOutline } from 'react-icons/io5';
import { BsPhone, BsLaptop, BsHeadphones } from 'react-icons/bs';



export default function Header() {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const activeStyles = {
        fontWeight: "bold",
        // color: "#C7F9CC",
    }

    const closeBurgerMenu = () => {
        setIsBurgerMenuOpen(false);
    };

    return (
        <header>

            <div className='header-up' >
                <NavLink to="/Call">
                    <TfiHeadphoneAlt />
                    <span>078 000 111</span>
                </NavLink>
            </div>

            <div className='header-middle'>
                <div className="header-middle-site-logo">
                    <Link  to="/" 
                        onClick={closeBurgerMenu}>
                        <h2>Electro</h2>
                    </Link>
                </div>
                <div className="header-middle-icons">
                    <NavLink>
                        <AiOutlineSearch className="header-icon" />
                    </NavLink>  
                    <NavLink>
                        <AiOutlineShoppingCart className="header-icon"/> 
                    </NavLink>  
                    <NavLink>
                        <BiUserCircle className="header-icon"/>
                    </NavLink>  
                    <div 
                        className='burger-menu-button' 
                        onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
                        <BiMenu className="header-icon header-icon-burger"/>
                    </div>
                </div>
            </div>

            <div className='header-down'>
                <nav className="horizontal-scroll">
                    <ul>
                        <li>
                            <NavLink to="/Telefoane" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={closeBurgerMenu}>
                                <p>Telefoane</p>
                                <BsPhone />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Laptopuri" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={closeBurgerMenu}>
                                <p>Laptopuri</p>
                                <BsLaptop />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Gadgeturi" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={closeBurgerMenu}>
                                <p>Gadgeturi</p>
                                <IoWatchOutline />
                            </NavLink>
                        </li>
                        <li>
                        <NavLink to="/Tablete" 
                            style={({ isActive }) => isActive ? activeStyles : null}
                            onClick={closeBurgerMenu}>
                            <p>Tablete</p>
                            <FiTablet />
                        </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Accesorii" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={closeBurgerMenu}>
                                <p>Accesorii</p>
                                <BsHeadphones />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>


            <div className={`burger-container ${isBurgerMenuOpen ? 'open' : ''}`}>
                <div className='burger-container-close-button' onClick={closeBurgerMenu}>
                    <AiOutlineCloseCircle style={{ width: '1.7rem', height: '1.7rem' }} />
                </div>
                <NavLink to="/Magazine" 
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeBurgerMenu}>
                    Magazine
                </NavLink>
                <NavLink to="/Call" 
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeBurgerMenu}>
                    Sună
                </NavLink>
                <NavLink to="/Exclusiv" 
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeBurgerMenu}>
                    Exclusiv
                </NavLink>
                <NavLink to="/Conectare" 
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeBurgerMenu}>
                    Conectare
                </NavLink>
                <NavLink to="/Tradein" 
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={closeBurgerMenu}>
                    Tradein
                </NavLink>
            </div> 
          
        </header>
    )
}