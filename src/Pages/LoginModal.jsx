import React from 'react';

const LoginModal = ({ isOpen, onClose,handleLogin }) => {
    
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Login</h2>
                
                UserName: <input type="text" id="username" /><br></br>
               
                Password:<input type="password" id="password" />
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
