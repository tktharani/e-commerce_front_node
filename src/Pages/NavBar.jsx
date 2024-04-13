import React, { useState } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';
import './NavBar.css';

const NavBar = () => {
    
    const handleSearch = (e) => {
        console.log('Search query:', e.target.value);
    };

   
    return (
        <nav className="navbar">
            <div className="logo">
                {/* <img src={logo} alt="Logo" /> */}
            </div>
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <SearchBar onChange={handleSearch} />
            </div>
            <div className="nav-links">
                <a href="/login" >Login/Register</a>
                <FaShoppingCart className="cart-icon" />
            </div>
           
            
        </nav>
    );
};

export default NavBar;
