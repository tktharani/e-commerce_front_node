import React, { useState } from 'react';
import './NavBar.css';
import LoginModal from './LoginModal';

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const handleLogin = () => {
        // console.log("Login clicked")
        setIsModalOpen(true);
        // console.log("isModalOpen:", isModalOpen); 
    };

    
    const handleSuccessfulLogin = () => {
        // Logic to handle successful login, e.g., update user information
        setIsModalOpen(false);
         // Close the modal after successful login
        //  console.log('isModalOpen:', isModalOpen); 
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Add your search logic here, such as navigating to a search results page or filtering products
        console.log('Search term:', searchTerm);
        setSearchTerm('');
    };


    

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/images/icon-12.avif" alt="Logo" />
            </div>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>
            
            <div className="nav-links">
            <a href="/">Home</a>
                <a href="/">Products</a>
                <a href="/">Contact Us</a>
                <button onClick={handleLogin}>Login/Register</button>
                
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleSuccessfulLogin} />
                </div>
            )}
              
        </nav>
    );
};

export default NavBar;