import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg text-dark">
            <div className="container-fluid p-5">
                <div className="row mx-0">
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: example@example.com</p>
                        <p>Phone: +1 234 567 890</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Home</a></li>
                            <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Product</a></li>
                            <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>About Us</a></li>
                            <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faFacebookF} style={{ color: '#333', fontSize: '24px' }} /></a></li>
                            <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faTwitter} style={{ color: '#333', fontSize: '24px' }} /></a></li>
                            <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faInstagram} style={{ color: '#333', fontSize: '24px' }} /></a></li>
                            <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faLinkedin} style={{ color: '#333', fontSize: '24px' }} /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col text-center">
                        <p>&copy; 2024 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
