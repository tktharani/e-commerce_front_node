import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiShoppingCart, FiPlusCircle,FiLogOut } from 'react-icons/fi';
import { BsClipboardData } from 'react-icons/bs';

import axios from 'axios';
import './Sidebar.css';
import UserViewModal from './UserViewModal';
import UserEditModal from './UserEditModal';
import AddProductForm from './AddProductForm';

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State variable for delete confirmation modal
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for view modal
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for view modal
  const [activeLink, setActiveLink] = useState('dashboard');
  const [showEditModal, setShowEditModal] = useState(false); // State variable for edit modal
  const [editUserId, setEditUserId] = useState(null);
  const [initialUserData, setInitialUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/list');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/user/${deleteUserId}`);
      setUsers(users.filter((user) => user._id !== deleteUserId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleEdit = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`);
      setInitialUserData(response.data);
      setEditUserId(userId);
      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching user data:', error.response);
    }
  };

  const handleAddProduct = () => {
    fetchUsers(); // Function to fetch updated product list after adding a new product
  };

  const handleAddProductClick = () => {
    console.log('Add Product link clicked');
    setShowAddProductForm(true);
  };

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
    setShowAddProductForm(false);
  };

  // Logout function
  const handleLogout = () => {
    // Perform logout actions (e.g., clear session, remove tokens)
    // Redirect to the home page
    window.location.href = '/'; // This will reload the page and navigate to the home page
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Admin Dashboard</h3>
          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
          </button>
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
              to="/admin/products"
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
                // handleAddProductClick();
              }}
            >
              <FiPlusCircle className="sidebar-icon" />
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/cart"
              className={`sidebar-link ${activeLink === 'orders' ? 'active' : ''}`}
              onClick={() => handleSetActiveLink('orders')}
            >
              <BsClipboardData className="sidebar-icon" />
              Orders
            </Link>
          </li>
        </ul>
      </div>
       {/* Add Product Form */}
       {showAddProductForm && (
        <div className="add-product-form">
          <AddProductForm handleAddProduct={handleAddProduct} />
        </div>
      )}
      {activeLink === 'users' && (
        <div className="user-list">
          <h4>All Users</h4>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />

          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Phone_Number</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td>{user.phonenumber}</td>
                  <td>
                      {user.address ? (
                        <div>
                          {user.address.street}<br />
                          {user.address.city}<br />
                          {user.address.state}, {user.address.postalCode}<br />
                          {user.address.country}
                        </div>
                      ) : (
                        'Address Not Available'
                      )}
                    </td>
                  <td>
                    <button onClick={() => handleView(user._id)} className="btn btn-primary btn-sm">
                      View
                    </button>
                    <button onClick={() => handleEdit(user._id)} className="btn btn-secondary btn-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div
              className="modal"
              style={{
                display: 'block',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                padding: '20px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: '1000',
                borderRadius: '5px',
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">Are you sure you want to delete this user?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          )}
          

          {/* UserViewModal */}
          <UserViewModal show={showModal} handleClose={() => setShowModal(false)} userId={selectedUser} />

          <UserEditModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            userId={editUserId}
            handleUpdate={() => {
              console.log('User updated');
              fetchUsers();
            }}
          />
          
{/* Pagination */}
<div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        </div>

         
        </div>
      )}
    </div>
  );
};

export default Sidebar;
