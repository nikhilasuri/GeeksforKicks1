// AdminOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ShoppingCart } from "lucide-react";
import "./AdminOrderPage.css"; // Add your CSS styling here

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders"); // Assuming "orders" is the collection name
        const orderSnapshot = await getDocs(ordersCollection);
        const orderList = orderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  // Delete an order from Firestore
  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  return (
    <section className="admin-orders-page">
      <div className="admin-header">
        <h1>Orders Management</h1>
        <p>Manage all orders from here. You can delete any order.</p>
      </div>

      <div className="orders-list">
        <h2>All Orders</h2>
        {orders.length > 0 ? (
            
            <ul>
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <h3>Order ID: {order.id}</h3>
                <p><strong>Total Price:</strong> ${order.totalAmount}</p>
          
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items?.map((item, index) => (
                      <li key={index} className="order-product">
                        <img src={item.image} alt={item.name} className="product-img" />
                        <div>
                          <p><strong>{item.name}</strong></p>
                          <p>Price: ${item.price}</p>
                          <p>Quantity: {item.amount}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
          
                <div className="shipping-info">
                  <h4>Shipping Info:</h4>
                  <p><strong>Address:</strong> {order.shippingInfo?.address}</p>
                  <p><strong>City:</strong> {order.shippingInfo?.city}</p>
                  <p><strong>Country:</strong> {order.shippingInfo?.country}</p>
                  <p><strong>ZIP:</strong> {order.shippingInfo?.zip}</p>
                </div>
          
                <button className="admin-btn delete-btn" onClick={() => deleteOrder(order.id)}>
                  Delete Order
                </button>
              </li>
            ))}
          </ul>
          
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default AdminOrdersPage;
