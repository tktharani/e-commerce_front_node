import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5000'; 

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${API_URL}/wishlist/add`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: { userId }
        });
        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };
    fetchWishlistItems();
  }, []);

  return (
    <div className="container mt-5">
      <h1>My Wishlist</h1>
      <ul className="list-group">
        {wishlistItems.map(item => (
          <li key={item._id} className="list-group-item">
            {/* Display wishlist item details */}
            <div>
              <h5>{item.product.name}</h5>
              <p>Price: Rs.{item.product.price}</p>
              <p>Category: {item.product.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
