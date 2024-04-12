import React, { useState } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';
import './NavBar.css';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginFormData, setLoginFormData] = useState({ username: '', password: '' });

    const handleSearch = (e) => {
        console.log('Search query:', e.target.value);
    };

    const handleLogin = () => {
        setShowLoginModal(true);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Login form data:', loginFormData);
        setShowLoginModal(false); // Close the modal after submission
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
                <a href="/login" onClick={handleLogin}>Login/Register</a>
                <FaShoppingCart className="cart-icon" />
            </div>
            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <input type="text" placeholder="Username" value={loginFormData.username} onChange={(e) => setLoginFormData({ ...loginFormData, username: e.target.value })} />
                            <input type="password" placeholder="Password" value={loginFormData.password} onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })} />
                            <div className="modal-buttons">
                                <button type="submit">Submit</button>
                                <button onClick={() => setShowLoginModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
