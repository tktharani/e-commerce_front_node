import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserEditModal = ({ show, handleClose,userId, handleUpdate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: ''
  });

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/user/${userId}`);
        const userData = response.data; 
        setFormData(userData); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (show && userId) {
      fetchUserData();
    }
  }, [show, userId]);

  useEffect(() => {
    }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/user/${userId}`, formData);
      handleUpdate();
      handleClose(); 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  


  return (
    <div className="modal" style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
      <div className="modal-dialog" style={{ maxWidth: 500, margin: 'auto', marginTop: 200 }}>
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body" style={{ padding: 20 }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="text" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name:</label>
                <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role:</label>
                <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
