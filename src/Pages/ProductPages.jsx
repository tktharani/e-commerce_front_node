import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table,Pagination } from 'react-bootstrap';
import ProductViewModal from './ProductViewModal';
import ProductEditModal from './ProductEditModal';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProductId, setViewProductId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
const [filteredProducts, setFilteredProducts] = useState([]);


  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/list');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    console.log('Filtered Products:', filtered); // Check if filtering works
  }, [searchTerm, products]);


  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/product/${productId}`);
      console.log(response.data); // Handle success message or redirect here
      fetchProducts(); // Refresh products after deletion
      setShowDeleteModal(false); // Close modal after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setShowDeleteModal(false);
  };

  const openViewModal = (productId) => {
    setViewProductId(productId);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setViewProductId(null);
    setShowViewModal(false);
  };

  const openEditModal = (productId) => {
    setEditProductId(productId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditProductId(null);
    setShowEditModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
     // Ensure this line is correctly updating the searchTerm state
     console.log('Search Term:', event.target.value); 
    };

  

  return (
    <div className="products-page">
      <h1>All Products</h1>
      <input
        type="text"
        className="form-control m-2" // Bootstrap class for form control
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>Rs.{product.price}</td>
              <td>
                <img src={`http://localhost:5000/public/data/uploads/${product.image}`} alt={product.name} style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>{product.category}</td>
              <td>
                <Button variant="primary" className="mr-2" onClick={() => openViewModal(product._id)}>View</Button>
                <Button variant="warning" className="mr-2" onClick={() => openEditModal(product._id)} >Edit</Button>
                <Button variant="danger" onClick={() => openDeleteModal(product)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Bootstrap Pagination */}
      <div className="d-flex justify-content-center">
      <Pagination>
        {Array(Math.ceil(products.length / itemsPerPage))
          .fill()
          .map((_, index) => (
            <Pagination.Item
              key={index}
              active={currentPage === index + 1}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
      </Pagination>
      </div>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to delete the product?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <p>Delete {selectedProduct.name}?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>Cancel</Button>
          <Button variant="danger" onClick={() => { handleDelete(selectedProduct._id); }}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <ProductViewModal
        productId={viewProductId}
        show={showViewModal}
        onHide={closeViewModal}
      />

      {/* Edit Modal */}
      <ProductEditModal
        productId={editProductId}
        show={showEditModal}
        onHide={closeEditModal}
      />
    </div>
  );
};

export default ProductsPage;
