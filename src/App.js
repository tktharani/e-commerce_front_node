import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './Pages/ProductList'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>

       <Route path="/" element={<ProductList />}></Route>

      
 

       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
