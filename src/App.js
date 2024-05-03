import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Corrected import for Bootstrap JS

import NavBar from './Pages/NavBar';
import Sidebar from './Pages/Sidebar';
import UserViewModal from './Pages/UserViewModal';
import ProductList from './Pages/ProductList';
import UserEditModal from './Pages/UserEditModal';
import AddProductForm from './Pages/AddProductForm';
import LoginModal from './Pages/LoginModal';
import RegisterPage from './Pages/RegisterPage';
import ProductPages from './Pages/ProductPages'; 

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/products" element={<ProductPages />} />
          <Route path="/add" element={<AddProductForm />} /> {/* Changed Component to element */}
          <Route path="/admin" element={<Sidebar />} />
          <Route path="/users/view/:userId" element={<UserViewModal />} />
          <Route path="/users/edit/:userId" element={<UserEditModal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
