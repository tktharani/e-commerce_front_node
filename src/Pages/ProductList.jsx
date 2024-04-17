import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); 

  useEffect(() => {
    axios.get('http://localhost:5000/product/list')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); 
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on selectedCategory
    if (selectedCategory === 'all') {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h3 className="p-5">Select Category:</h3>
          <div className="">
            <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="all">All Categories</option>
              <option value="grocery">Grocery</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              
            </select>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="mt-3">Product List</h1>
          <div className="row mt-3">
            {filteredProducts.map(product => (
              <div key={product._id} className="col-md-4 mb-3">
                <div className="card">
                  <img src={product.image} className="card-img-top" alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: Rs.{product.price}</p>
                    <p className="card-text">Category: {product.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
