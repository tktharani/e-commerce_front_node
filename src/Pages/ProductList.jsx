import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button,Modal,Carousel } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; 
import { FaMinus, FaPlus } from 'react-icons/fa';
import LoginModal from './LoginModal';

const API_URL = 'http://localhost:5000'; 


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/list`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
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

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        setUserId(storedUserId);
    }
}, []);

  // Update handleAddToCart function in ProductList.js
  const handleAddToCart = async (product) => {
    if (isLoggedIn) {
      try {
        const userId = localStorage.getItem('userId'); // Get userId from storage
        // console.log('LoggedInUser:', loggedInUser); // Log the loggedInUser to ensure it's set correctly
        console.log('User ID from localStorage:', userId); // Log the user ID from localStorage
  
        if (!userId) {
          console.error('User ID not found in localStorage');
          // Optionally, handle this case by showing an error message to the user or redirecting to login
          return;
        }
  
        const response = await axios.post(`${API_URL}/add-to-cart`, {
          userId: userId,
          productId: product._id,
          quantity: 1, // You can change the quantity logic as needed
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT token
          },
        });
  
        console.log(response.data); // Log success message or handle accordingly
         // Show alert when product is added to the cart
         alert(`Product added to the cart successfully!`);

      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      setShowLoginModal(true); // Show login modal if not logged in
    }
  };
  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const handleShowCartModal = async () => {
    if (isLoggedIn) {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }
  
        // Fetch user details including username
        const userResponse = await axios.get(`${API_URL}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        const userData = userResponse.data;
        if (!userData) {
          console.error('User data not found');
          return;
        }
  
        // Update username state
        setUsername(userData.username);
  
        // Fetch cart details
        const cartResponse = await axios.get(`${API_URL}/cart-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
         setCartItems(cartResponse.data.products);
         setCartTotalPrice(cartResponse.data.totalPrice); 
        
        setShowCartModal(true);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    } else {
      setShowLoginModal(true);
    }
  };


  // Function to update cart item quantity
  const updateCartQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `${API_URL}/update-cart-quantity/${userId}/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT token
          },
        }
      );

      console.log(response.data); // Log success message or handle accordingly
      // Refresh cart details after updating quantity
      handleShowCartModal();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  // Function to increase quantity
  const increaseQuantity = (productId) => {
    const updatedItems = cartItems.map(item => {
      if (item.product._id === productId) {
        item.quantity += 1; // Increase quantity
        updateCartQuantity(productId, item.quantity); // Update quantity in the backend
      }
      return item;
    });
    setCartItems(updatedItems); // Update state
  };

  // Function to decrease quantity
  const decreaseQuantity = (productId) => {
    const updatedItems = cartItems.map(item => {
      if (item.product._id === productId && item.quantity > 1) {
        item.quantity -= 1; // Decrease quantity
        updateCartQuantity(productId, item.quantity); // Update quantity in the backend
      }
      return item;
    });
    setCartItems(updatedItems); // Update state
  };

  // Update handleRemoveFromCart function in ProductList.js
// Update handleRemoveFromCart function in ProductList.js
const handleRemoveFromCart = async (productId) => {
  try {
    const userId = localStorage.getItem('userId'); // Get userId from storage
    const token = localStorage.getItem('token'); // Get JWT token from storage

    if (!userId) {
      console.error('User ID not found in localStorage');
      // Optionally, handle this case by showing an error message to the user or redirecting to login
      return;
    }

    const response = await axios.delete(`${API_URL}/remove-from-cart`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send JWT token in headers
      },
      data: { userId, productId }, // Send userId and productId in the request body
    });

    console.log(response.data); // Log success message or handle accordingly
    // Refresh cart details or update UI after removing item from cart
    //Update cartItems state in the frontend to reflect the removal
    const updatedCartItems = cartItems.filter(item => item.product._id !== productId);
    setCartItems(updatedCartItems);
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};



  const handleProceedToBuy = () => {
    // Add your logic here for proceeding to buy
    console.log('Proceeding to buy...'); // Placeholder action
    // You can navigate to the checkout page or perform other actions
  };
  

 

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
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
                onClick= {handleShowCartModal}
              >
              <FaShoppingCart size={24} />
          {/* Show cart item count badge */}
          {cartItems.length > 0 && (
            <span
              className="cart-count position-absolute end-0 top-100 translate-middle badge rounded-pill bg-success"
              style={{ fontSize: '14px' }}
            >
              {cartItems.length}
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
      <Modal show={showCartModal} onHide={handleCloseCartModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {cartItems.length > 0 ? (
    <div>
      <p>User_ID: {userId}</p>
      <p>User_Name: {username}</p> {/* Display username */}
      <ul className="list-group">
        {cartItems.map((item) => (
          <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {/* Access product details */}
              Product_Name: {item.product.name} <br />
              Product_Price: Rs.{item.product.price} <br />
              {/* Quantity display with increase and decrease buttons */}
              Quantity: 
                      <Button variant="success" onClick={() => decreaseQuantity(item.product._id)}><FaMinus style={{ fontSize: '10px' }} /></Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="success" onClick={() => increaseQuantity(item.product._id)}><FaPlus style={{ fontSize: '10px' }} /></Button>
                      <Button variant="danger" onClick={() => handleRemoveFromCart (item.product._id)}>Remove</Button> {/* Remove button */}
           
                      <br />
              Total Price: Rs.{item.product.price * item.quantity} {/* Calculate total price */}

            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>Your cart is empty.</p>
  )}
</Modal.Body>

        <Modal.Footer>
        {/* Display total cart price */}
        <p>Total Cart Price: Rs. {cartTotalPrice.toFixed(2)}</p>
                <Button variant="secondary" onClick={handleCloseCartModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleProceedToBuy}>
                Proceed to Buy
           </Button>
        </Modal.Footer>
      </Modal>


      

      


      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} 
      onClose={() => setShowLoginModal(false)} 
      onLogin={() => setIsLoggedIn(true)} />


            
      
    </div>
  );
};

export default ProductList;
