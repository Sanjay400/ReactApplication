// src/OrderHistory/OrderHistory.js
import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser && loggedInUser.id) {
        try {
          const response = await fetch(`http://localhost:5000/users/${loggedInUser.id}`);
          const user = await response.json();
          setOrders(user.orderHistory || []);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (!loggedInUser) return;

    const updatedOrderHistory = orders.filter(order => order.id !== orderId);

    // Update the server and localStorage
    try {
      await fetch(`http://localhost:5000/users/${loggedInUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderHistory: updatedOrderHistory }),
      });

      const updatedUser = {
        ...loggedInUser,
        orderHistory: updatedOrderHistory,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setOrders(updatedOrderHistory);
      alert('Order canceled successfully!');
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
            <div className="order-items">
              {order.products.map((product, index) => (
                <div key={index} className="order-item">
                  <img
                    src={product.image ? `/image/${product.image}` : '/default-image.png'}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p><strong>Price:</strong> ${product.price ? product.price.toFixed(2) : 'N/A'}</p>
                    <p><strong>Quantity:</strong> {product.quantity || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="cancel-order-btn"
              onClick={() => handleCancelOrder(order.id)}
            >
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
