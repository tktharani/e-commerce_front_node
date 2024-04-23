import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PaymentPage = ({ show, handleClose }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePay = () => {
    // Payment logic here, you can include actual payment processing
    setPaymentSuccess(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your payment is successful. Thank you for shopping!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
      
  );
};

export default PaymentPage;
