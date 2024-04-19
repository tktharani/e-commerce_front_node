import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ProductEditModal = ({ productId, show, onHide }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // State to store the image file
  const [category, setCategory] = useState('');
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        const productData = response.data;
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setImage(productData.image); // Set image URL if available
        setCategory(productData.category); // Set category
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (show && productId) {
      fetchProduct();
      
    }
  }, [productId, show]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file as the image state
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image); // Append the image file to the form data
      formData.append('category', category); // Append the category to the form data

      const response = await axios.put(`http://localhost:5000/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Handle success message or redirect here
      onHide(); // Close modal after editing
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image Upload</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          
          <Button variant="primary" type="submit">Save Changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductEditModal;
