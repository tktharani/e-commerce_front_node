import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentForm = ({ userId }) => {
  const [paymentData, setPaymentData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [userAddress, setUserAddress] = useState('');
  const [username, setUsername] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
      setAlertMessage('Your payment is successful.');
      setPaymentSuccess(true); // Set payment success state
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
              <p>
                {userAddress.city}, {userAddress.state} {userAddress.postalCode}
              </p>
              <p>{userAddress.country}</p>
              {/* Display the phone number if available */}
              {userAddress.user && userAddress.user.phonenumber && (
                <p>Phone: {userAddress.user.phonenumber}</p>
              )}
            </div>
          )}
        </Col>
        <Col md={6}>
          <h2 className="mb-4">Payment Form</h2>
          {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
          {!paymentSuccess && ( // Render the form if payment is not successful
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
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button variant="primary" type="submit">
                Submit Payment
              </Button>
            </Form>
          )}
          {paymentSuccess && ( // Render place order page component if payment is successful
            <div>
              {/* <h3>Your payment is successful!</h3> */}
              <h3>{username}</h3><p>Your Order Placed Successfully!!</p>
              <p>Thank u for Shopping!!!!</p>
              {/* Include your place order page component here */}
              {/* Example: <PlaceOrderPage /> */}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentForm;
