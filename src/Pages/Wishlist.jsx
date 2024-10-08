import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5000';

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

  const handleAddToCart = async (product) => {
    try {
      const userId = localStorage.getItem('userId'); // Get userId from storage
      
      // Add product to cart
      await axios.post(`${API_URL}/add-to-cart`, {
        userId,
        productId: product._id,
        quantity: 1, // Default quantity to add to cart
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT token
        },
      });
  
      // Remove product from wishlist
      await axios.post(`${API_URL}/wishlist/remove`, {
        userId,
        productId: product._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      // Update the wishlist items state after removal
      setWishlistItems(wishlistItems.filter(item => item._id !== product._id));
      alert("Product added to cart and removed from wishlist successfully!");
    } catch (error) {
      console.error('Error adding product to cart and removing from wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`http://localhost:5000/wishlist/remove`, 
        { userId, productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update the wishlist items state after removal
      setWishlistItems(wishlistItems.filter(item => item._id !== productId));
      alert("Product will be removed successfully");
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };


  const updateQuantity = async (productId, newQuantity) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`http://localhost:5000/wishlist/updatequantity`, 
        { userId, productId, quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update the wishlist items state after quantity change
      setWishlistItems(wishlistItems.map(item => 
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };


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
              <button 
                className="btn btn-primary btn-sm mt-2 mx-2" 
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>

            <button 
                className="btn btn-danger btn-sm mt-2 mx-2" 
                onClick={() => removeFromWishlist(item._id)}
              >
                Remove
              </button>
        
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
