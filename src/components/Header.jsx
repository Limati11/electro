import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
// icons
import './header.scss';
import { AiOutlineCloseCircle, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiMenu, BiUserCircle } from 'react-icons/bi';
import { BsPhone, BsTablet, BsLaptop, BsDisplay } from 'react-icons/bs';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { PiHeadphonesLight } from 'react-icons/pi'
import { IoWatchOutline } from 'react-icons/io5'





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
                                <BsPhone className='gadget-icons' />
                                <p>Telefoane</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Laptopuri" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={closeBurgerMenu}>
                                <BsLaptop className='gadget-icons'/>
                                <p>Laptopuri</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Gadgeturi" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={closeBurgerMenu}>
                                <IoWatchOutline className='gadget-icons'/>
                                <p>Gadgeturi</p>
                            </NavLink>
                        </li>
                        <li>
                        <NavLink to="/Tablete" 
                            style={({ isActive }) => isActive ? activeStyles : null}
                            onClick={closeBurgerMenu}>
                            <BsTablet className='gadget-icons'/>
                            <p>Tablete</p>
                        </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Accesorii" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={closeBurgerMenu}>
                                <PiHeadphonesLight className='gadget-icons'/>
                                <p>Accesorii</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Televizoare" 
                                style={({ isActive }) => isActive ? activeStyles : null}
                                onClick={closeBurgerMenu}>
                                <BsDisplay className='gadget-icons'/>
                                <p>Televizoare</p>
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