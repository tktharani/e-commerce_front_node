import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Pages/NavBar';
import Sidebar from './Pages/Sidebar'
import UserViewModal from './Pages/UserViewModal';
import ProductList from './Pages/ProductList';

import UserEditModal from './Pages/UserEditModal';
import AddProductForm from './Pages/AddProductForm';

function App() {
  return (
    <div className="App">
      
       <BrowserRouter>
       <NavBar />
       <Routes>
       
       <Route path="/" element={<ProductList />}/>
       <Route path="/add" Component={AddProductForm} />
 
       <Route path="/admin" element={<Sidebar />}/>
       <Route path="/users/view/:userId" element={UserViewModal} />
       <Route path="/users/edit/:userId" element={UserEditModal} />
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
