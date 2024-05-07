import React from 'react';
import './PopularBrands.css'; // Import your CSS file for styles

const PopularBrands = () => {
  return (
    <div className="popular-brands-container">
      <h1 className="brands-heading">Popular Brands</h1>
      <div className="brand-images">
        <img src="images/nestle-1.webp" alt="Brand 1" className="brand-image" />
        <img src="images/brand-3.jpg" alt="Brand 2" className="brand-image" />
        <img src="images/brand-4.png" alt="Brand 3" className="brand-image" />
        <img src="images/brand-5.avif" alt="Brand 4" className="brand-image" />
        <img src="images/brand-6.png" alt="Brand 5" className="brand-image" />
        <img src="images/brand-7.jpg" alt="Brand 6" className="brand-image" />
        <img src="images/brand-8.png" alt="Brand 7" className="brand-image" />
        <img src="images/brand-9.png" alt="Brand 4" className="brand-image" />
  
  
  
  
        {/* Add more brand images */}
      </div>
    </div>
  );
};

export default PopularBrands;
