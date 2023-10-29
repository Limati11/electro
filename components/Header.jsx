import React, { useState } from 'react';
import './Header.css';
import { Link, NavLink } from "react-router-dom"
import { BiMenu } from 'react-icons/bi'


export default function Header() {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const activeStyles = {
        fontWeight: "bold",
        color: "#C7F9CC",
    }

    const closeBurgerMenu = () => {
        setIsBurgerMenuOpen(false);
    };

    return (
        <header>

            <section className='header-container'>
                <Link className="site-logo" to="/" >
                    <h2>Electron</h2>
                </Link>
                    <div className='burger-menu-icon' onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
                        <BiMenu />
                    </div>
            </section>



            <nav className={`burger-container ${isBurgerMenuOpen ? 'open' : ''}`}>
                    <span className='burger-container-close-button'>  
                        X
                    </span>
                    <div className="burger-container-inner">
                        <div className="account-row">
                                <NavLink to="/magazine" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Magazine
                                </NavLink>
                                <NavLink to="/call" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Sună
                                </NavLink>
                        </div>
                        
                        <ul className='nav-list'>
                            <li>
                                <NavLink to="/conectare" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Conectare
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/next" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Next
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/telefoane" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Telefoane
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/accesorii" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Accesorii
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/exclusiv" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Exclusiv
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Apple" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Apple
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Tablete" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Tablete
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Laptopuri" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Laptopuri
                                 </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Gadgeturi" 
                                    style={({ isActive }) => isActive ? activeStyles : null}
                                    onClick={closeBurgerMenu}>
                                    Gadgeturi
                                </NavLink>
                            </li>
                        </ul>
                   

                </div>
            </nav>
        </header>
    )
}