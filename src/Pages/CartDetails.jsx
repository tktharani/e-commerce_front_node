import React, { useState, useEffect } from 'react';

const CartDetails = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch('http://localhost:5000/carts');
        const data = await response.json();
        if (data && data.carts) {
          setCarts(data.carts);
        } else {
          setCarts([]);
        }
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };

    fetchCarts();
  }, []);

  return (
    <div>
      <h1>Order Details</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Product Name</th>
              <th>Images</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart, index) => (
              <tr key={index}>
                <td>{cart.user && cart.user.id}</td>
                <td>{cart.user && cart.user.username}</td>
                <td>{cart.user && cart.user.email}</td>
                <td>
                  {cart.products &&
                    cart.products.map((product, idx) => (
                      <div key={idx}>{product.product.name}</div>
                    ))}
                </td>
                <td>
                  {cart.products &&
                    cart.products.map((product, idx) => (
                      <div key={idx}>
                        <img
                          src={`http://localhost:5000/public/data/uploads/${product.product.image}`}
                          alt={product.product.name}
                          style={{ width: '50px' }}
                        />
                      </div>
                    ))}
                </td>
                <td>
                  {cart.products &&
                    cart.products.map((product, idx) => (
                      <div key={idx}>{product.product.price}</div>
                    ))}
                </td>
                <td>
                  {cart.products &&
                    cart.products.map((product, idx) => (
                      <div key={idx}>{product.quantity}</div>
                    ))}
                </td>
                <td>{cart.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartDetails;
