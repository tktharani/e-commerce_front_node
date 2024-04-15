import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ handleAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // State for image file

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!productName || !description || !price || !category || !image) {
        setError('Please fill in all fields.');
        return;
      }

      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('image', image); // Append the image file to FormData

      const response = await axios.post('http://localhost:5000/product/insert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      });
      if (response.status === 200) {
        setError('');
        if (typeof handleAddProduct === 'function') {
          handleAddProduct(); // Call the parent function to update the product list
        }
        // Clear the form fields
        setProductName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImage(null);
      } else {
        setError('Error adding product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '5px' }}>
        <div className="card-body">
          <h5 className="card-title mb-4">Add Product</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={{ width: '100%' }}
              >
                <option value="">Select Category</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="grocery">Grocery</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image Upload</label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setImage(e.target.files[0])} // Handle file change and update state
                required
                accept="image/*" // Accept only image files
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
