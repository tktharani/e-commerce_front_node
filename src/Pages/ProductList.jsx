import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal,Carousel } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; 
import LoginModal from './LoginModal';
import PaymentPage from './PaymentPage';
import PaymentSuccessModal from './PaymentSuccessModal ';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);


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
    if (isLoggedIn) {
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
    } else {
      setShowLoginModal(true);
    }
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

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleProceedToBuy = () => {
    if (isLoggedIn) {
      setShowPaymentPage(true);
      setShowCartModal(false); // Close the cart modal when proceeding to buy
    } else {
      setShowLoginModal(true);
    }
  };

 
  

  const handlePaymentSuccess = () => {
    setShowPaymentSuccessModal(true);
  };

  return (
    <div className="container m-5">
      {/* Custom styles for reducing Carousel height */}
      
      <style>{`
        .carousel-item {
          height: 300px; /* Adjust the height as needed */
        }

        .carousel-item img {
          object-fit: cover;
          height: 100%;
          width: 100%;
        }
      `}</style>

    {/* Bootstrap Carousel */}
      <Carousel fade className="mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/c-4.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/c-3.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/c-1.webp"
            alt="Thrid slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/c-6.webp"
            alt="Thrid slide"
          />
        </Carousel.Item>
       
      </Carousel>
      {/* End Bootstrap Carousel */}
      <div className="row ">
        <div className="col-md-3">
          {/* Category Dropdown */}
          <h2>Categories</h2>
         <select className="form-select mt-3" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            <option value="grocery">Grocery</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            {/* Add more categories as needed */}
          </select>
          {/* Cart Icon */}
          <div className="position-fixed top-0 end-0 m-5  p-5">
              <div
                className="cart-icon d-flex justify-content-center align-items-center position-relative"
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'blue',
                  color: 'white',
                  borderRadius: '70%',
                  cursor: 'pointer',
                }}
                onClick={() => setShowCartModal(true)}
              >
                <FaShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span
                    className="cart-count position-absolute end-0   top-100 translate-middle badge rounded-pill bg-success"
                    style={{ fontSize: '14px' }}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </div>
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
      <Modal show={showCartModal} onHide={() => setShowCartModal(false)} centered>
     
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {cart.map(item => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                <img src={`http://localhost:5000/public/data/uploads/${item.image}`} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                      
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
          <Button variant="success" onClick={handleProceedToBuy}>Proceed to Buy</Button>
       
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowCartModal(false)}>Close</Button>
      
        </Modal.Footer>
      </Modal>

      {/* PaymentPage Modal */}
      <PaymentPage
        isOpen={showPaymentPage}
        onClose={() => setShowPaymentPage(false)}
        totalPrice={getTotalPrice()}
        handlePaymentSuccess={handlePaymentSuccess}
      />

<PaymentSuccessModal
  show={showPaymentSuccessModal}
  handleClose={() => setShowPaymentSuccessModal(false)}
/>
      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} 
      onClose={() => setShowLoginModal(false)} 
      onLogin={() => setIsLoggedIn(true)} />


            
      
    </div>
  );
};

export default ProductList;
