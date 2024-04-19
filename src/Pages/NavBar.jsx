import React, { useState,useEffect } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';
import './NavBar.css';
import LoginModal from './LoginModal';

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (e) => {
        console.log('Search query:', e.target.value);
    };

    const handleLogin = () => {
        // console.log("Login clicked")
        setIsModalOpen(true);
        // console.log("isModalOpen:", isModalOpen); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    

    return (
        <nav className="navbar">
            <div className="logo">
                {/* <img src="" alt="Logo" /> */}
            </div>
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <SearchBar onChange={handleSearch} />
            </div>
            <div className="nav-links">
                <button onClick={handleLogin}>Login</button>
                <FaShoppingCart className="cart-icon" />
            </div>
            {isModalOpen && (
    <div className="modal-overlay">
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} handleLogin={handleLogin} />
    </div>
)}
              
        </nav>
    );
};

export default NavBar;
