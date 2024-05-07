import React from 'react';

const PlaceOrderPage = ({ orderDetails }) => {
  const { items, total, deliveryAddress, paymentMethod } = orderDetails;

  return (
    <div className="place-order-container">
      <h2>Order Summary</h2>
      <div className="order-details">
        <h3>Items in Order:</h3>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="order-total">
        <h3>Total Price:</h3>
        <p>${total}</p>
      </div>
      <div className="delivery-address">
        <h3>Delivery Address:</h3>
        <p>{deliveryAddress.street}</p>
        <p>
          {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.postalCode}
        </p>
        <p>{deliveryAddress.country}</p>
      </div>
      <div className="payment-method">
        <h3>Payment Method:</h3>
        <p>{paymentMethod}</p>
      </div>
      {/* Additional order details and confirmation message can be added here */}
    </div>
  );
};

export default PlaceOrderPage;
