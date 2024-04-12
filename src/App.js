import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';
import NavBar from './Pages/NavBar';

function App() {
  return (
    <div className="App">
      
       <BrowserRouter>
       <NavBar />
       <Routes>
       
       <Route path="/" element={<ProductList />}></Route>
       <Route path="/add" element={<AddProduct />}></Route>
       
      
 

       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
