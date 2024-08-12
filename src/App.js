import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Corrected import for Bootstrap JS
import '@fortawesome/fontawesome-free/css/all.min.css';



import Sidebar from './Pages/Sidebar';
import UserViewModal from './Pages/UserViewModal';
import ProductList from './Pages/ProductList';
import UserEditModal from './Pages/UserEditModal';
import AddProductForm from './Pages/AddProductForm';
import LoginModal from './Pages/LoginModal';
import RegisterPage from './Pages/RegisterPage';
import ProductPages from './Pages/ProductPages'; 
import PaymentForm from './Pages/PaymentForm';
import PlaceOrder from './Pages/PlaceOrder';
import CartDetails from './Pages/CartDetails';
import Wishlist from './Pages/Wishlist'


function App() {
  return (
    <div className="App">
      
      
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
          <Route path="/payment-form" element={<PaymentForm />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/admin/cart" element={<CartDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          
          
                 
                 
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
