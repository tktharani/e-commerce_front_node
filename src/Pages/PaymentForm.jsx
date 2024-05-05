import React, { useState,useEffect } from 'react';
import axios from 'axios'; 
import { Form, Button ,Container, Row, Col } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';

const PaymentForm = ({ userId }) => {
  console.log('User ID received in PaymentForm:', userId);
  const [paymentData, setPaymentData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [userAddress, setUserAddress] = useState('');
  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        const fetchUserAddress = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/address/${userId}`);
                setUserAddress(response.data.address);
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user address:', error);
            }
        };
        fetchUserAddress();
    }
}, []);


 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/payment', paymentData);
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error response
    }
  };
  

  return (
  <Container>
    <Row className="justify-content-center mt-5">
    <Col md={6}>
          <h3>Delivery Address</h3>
          {userAddress && (
            <div>
              <p>{username}</p>
              <p>{userAddress.street}</p>
              <p>{userAddress.city }, {userAddress.state } {userAddress.postalCode }</p>
              <p>{userAddress.country }</p>
              {/* Display the phone number if available */}
      {userAddress.user && userAddress.user.phonenumber && (
        <p>Phone: {userAddress.user.phonenumber}</p>
      )}
            </div>
          )}
        </Col>
      <Col md={6}>
        <h2 className="mb-4">Payment Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="cardholderName">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name on card"
              name="cardholderName"
              value={paymentData.cardholderName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card number"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="expiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YYYY"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="cvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CVV"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              required
            />
          </Form.Group>
        <Link to="/">
          <Button variant="secondary">
            Cancel
          </Button>
        </Link> 
          <Button variant="primary" type="submit">
        Submit Payment </Button>
        </Form>
      </Col>
    </Row>
  </Container>
    
      );
};

export default PaymentForm;
