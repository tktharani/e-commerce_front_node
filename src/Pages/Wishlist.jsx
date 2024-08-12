import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/wishlist/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setWishlistItems(response.data.products); // Assuming response.data.products contains the list of products in the wishlist
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }, []);

  return (
    <div className="container mt-5">
      <h1>My Wishlist</h1>
      {user && (
        <div className="mb-4">
          <h5>User ID: {user._id}</h5>
          <h5>Username: {user.username}</h5>
        </div>
      )}

      <ul className="list-group">
        {wishlistItems.map(item => (
          <li key={item._id} className="list-group-item">
            <div>
              <h5>{item.name}</h5>
              <p>Price: Rs.{item.price}</p>
              <p>Category: {item.category}</p>
              <img src={`http://localhost:5000/public/data/uploads/${item.image}`} 
              className="card-img-top" alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
   
        
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
