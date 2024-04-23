import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentPage = ({ isOpen, onClose, totalPrice,handlePaymentSuccess }) => {
    // const [paymentSuccess, setPaymentSuccess] = useState(false);

    
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    // Perform payment logic here (e.g., validate fields, process payment)
    console.log('Processing payment...');
    handlePaymentSuccess(); // Call the function to handle payment success
    onClose(); // Close the payment modal after processing payment
  };
  
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="Enter card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formCardHolderName">
            <Form.Label>Card Holder Name</Form.Label>
            <Form.Control type="text" placeholder="Enter card holder name" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formExpiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control type="text" placeholder="MM/YYYY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formCvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handlePayment}>Pay Rs.{totalPrice}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentPage;
