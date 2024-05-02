import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    console.log('isOpen:', isOpen);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Stored token:', token);
        if (token) {
            const decodedToken = decodeToken(token);
            console.log('Decoded token:', decodedToken);
            if (decodedToken && decodedToken.username) {
                setLoggedInUser(decodedToken.username);
            }
        }
    }, []);

    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Token decoding error:', error);
            return null;
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/user/login', {
                username,
                password
            });
            const { token, username: loggedInUsername,userId } = response.data;
            console.log('Logged in user:', loggedInUsername);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId); // Set the user ID in localStorage

            setLoggedInUser(loggedInUsername);
            alert('You are successfully logged in!');
            onLogin();
            onClose();
            
            
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedInUser(null);
        // Additional logout logic (e.g., redirect, clear state, etc.)
    };
    console.log('loggedInUser:', loggedInUser);

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
            {loggedInUser ? (
                    <>
                        <h2 style={{ marginBottom: '10px' }}>Welcome, {loggedInUser}!</h2>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <h2>Login</h2>
                        UserName: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="modal-buttons">
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleLogin}>Login</button>
                        </div>
                        <p>Don't have an account? <a href="/register">Create an account</a></p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
