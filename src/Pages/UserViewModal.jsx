import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const UserViewModal = ({ show, handleClose, userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (show && userId) {
      fetchUserDetails(userId);
    }
  }, [show, userId]);

  return (
    <Modal show={show} onHide={handleClose} centered backdropClassName="">
     
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userData ? (
          <>
            <p>UserId: {userData._id}</p>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Full Name: {userData.fullName}</p>
            <p>Password: {userData.password}</p>
            <p>Phone_number:{userData.phonenumber}</p>
            <p>Role: {userData.role}</p>
            {userData.address ? (
              <>
                <p>Address:</p>
                <p>{userData.address.street},{userData.address.city}</p>
                <p>{userData.address.state},{userData.address.postalCode}</p>
                <p>{userData.address.country}</p>
              </>
            ) : (
              <p>Address not available</p>
            )}
            
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserViewModal;
