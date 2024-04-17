import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiShoppingCart, FiPlusCircle } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ activeLink, handleSetActiveLink, setShowAddProductForm }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Admin Dashboard</h3>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link
              to="/"
              className={`sidebar-link ${activeLink === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleSetActiveLink('dashboard')}
            >
              <FiHome className="sidebar-icon" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className={`sidebar-link ${activeLink === 'users' ? 'active' : ''}`}
              onClick={() => handleSetActiveLink('users')}
            >
              <FiUsers className="sidebar-icon" />
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className={`sidebar-link ${activeLink === 'products' ? 'active' : ''}`}
              onClick={() => handleSetActiveLink('products')}
            >
              <FiShoppingCart className="sidebar-icon" />
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className={`sidebar-link ${activeLink === 'addproduct' ? 'active' : ''}`}
              onClick={() => {
                handleSetActiveLink('addproduct');
                setShowAddProductForm(true);
              }}
            >
              <FiPlusCircle className="sidebar-icon" />
              Add Product
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const AddProductForm = ({ handleAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // State for image file

  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleRemoveImage = () => {
    setImage(null);
  };


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
      formData.append('uploaded_file', image); // Append the image file to FormData

      const response = await fetch('http://localhost:5000/product/upload', {
      method: 'POST',
      body: formData,
    });
     
    if (response.ok) {
      setError('');
      if (typeof handleAddProduct === 'function') {
        handleAddProduct(); // Call the parent function to update the product list
      }
      // Clear the form fields
      setProductName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage('');
      alert('Product added successfully');
    } else {
      const text = await response.text(); // Get the response as text
      setError(text || 'Error adding product.');
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Form fields */}
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
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
              {image && (
                <div>
                  <img src={URL.createObjectURL(image)} alt="Product" style={{ maxWidth: '100px', marginBottom: '10px' }} />
                  <button type="button" className="btn btn-danger" onClick={handleRemoveImage}>Remove Image</button>
                </div>
              )}
              <label className="form-label">Image Upload</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="uploaded_file"
                onChange={(e) => setImage(e.target.files[0])} // Handle file change and update state
                accept="image/*" // Accept only image files
                style={{ width: '100%' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
   
            {/* Submit button */}
          </form>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [activeLink, setActiveLink] = useState('dashboard');
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
    setShowAddProductForm(false); // Hide Add Product form when navigating to other pages
  };

  return (
    <div className="admin-page">
      <Sidebar activeLink={activeLink} handleSetActiveLink={handleSetActiveLink} setShowAddProductForm={setShowAddProductForm} />
      <div className="content">
        {showAddProductForm ? (
          <AddProductForm />
        ) : (
          /* Render other content based on the active link */
           <p>Content for {activeLink}</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
