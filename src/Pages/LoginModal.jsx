import React, { useState } from 'react';
import axios from 'axios';

const LoginModal = ({ isOpen, onClose,onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/login', {
                username,
                password
            });
            const { token } = response.data;
            // Save the token to localStorage or sessionStorage
            localStorage.setItem('token', token); // Example using localStorage
            alert('You are successfully logged in!');
            onClose(); 
            onLogin();
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Login</h2>
                UserName: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <p>Don't have an account? <a href="/register">Create an account</a></p>
            </div>
        </div>
    );
};

export default LoginModal;
