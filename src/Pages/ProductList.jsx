import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; // Example: using React Icons

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/product/list')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on selectedCategory
    if (selectedCategory === 'all') {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setCartItemsCount(cartItemsCount + 1); // Increment cart items count
      };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    setCartItemsCount(cartItemsCount - 1); // Decrement cart items count
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          {/* Cart Icon */}
          <div className="cart-icon" onClick={() => setShowCartModal(true)}>
            <FaShoppingCart color="blue" size={24} />
            {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="mt-3">Product List</h1>
          <div className="row mt-3">
            {filteredProducts.map(product => (
              <div key={product._id} className="col-md-4 mb-3">
                {/* Product card */}
                <div className="card">
                  <img src={`http://localhost:5000/public/data/uploads/${product.image}`} className="card-img-top" alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: Rs.{product.price}</p>
                    <p className="card-text">Category: {product.category}</p>
                    <Button variant="success" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Cart Modal */}
      <Modal show={showCartModal} onHide={handleCloseCartModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {cart.map(item => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  {item.name} - Rs.{item.price} - Quantity: {item.quantity}
                </div>
                <div>
                  <Button variant="info" size="sm"  className="m-2" onClick={() => handleIncreaseQuantity(item._id)}>+</Button>
                  <Button variant="info" size="sm" className="m-2" onClick={() => handleDecreaseQuantity(item._id)}>-</Button>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(item._id)}>Remove</Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3">Total Price: Rs.{getTotalPrice()}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCartModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
