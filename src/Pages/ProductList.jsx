import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/product/list')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

 
  return (
    <div className="container">
      <h1 className="mt-3">Product List</h1>
      <div className="row mt-3">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-3">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      );
};

export default ProductList;
