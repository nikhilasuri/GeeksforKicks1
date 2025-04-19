import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { db } from "../../firebase";
import "./userprofile.css";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({ displayName: "", email: "" });
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserData({
        displayName: currentUser.displayName || "",
        email: currentUser.email,
      });
      fetchOrders();
    }
  }, [currentUser]);

  const fetchOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const querySnapshot = await getDocs(ordersRef);
      const ordersList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((order) => order.email === currentUser.email);

      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { displayName: userData.displayName });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        <h2 className="user-profile__title">User Profile</h2>

        <div className="user-profile__section">
          <label className="user-profile__label">Name:</label>
          {editing ? (
            <input
              type="text"
              name="displayName"
              value={userData.displayName}
              onChange={handleInputChange}
              className="user-profile__input"
            />
          ) : (
            <p className="user-profile__text">{userData.displayName}</p>
          )}
        </div>

        <div className="user-profile__section">
          <label className="user-profile__label">Email:</label>
          <p className="user-profile__text">{userData.email}</p>
        </div>

        <div className="user-profile__actions">
          {editing ? (
            <button className="user-profile__btn" onClick={saveChanges}>
              Save
            </button>
          ) : (
            <button className="user-profile__btn" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        <h3 className="user-profile__subtitle">Your Orders</h3>
        {orders.length > 0 ? (
          <ul className="user-profile__order-list">
            {orders.map((order) => (
              <li key={order.id} className="user-profile__order-item">
                <div><strong>Order ID:</strong> {order.id}</div>
                <div><strong>Total:</strong> ₹{order.totalAmount}</div>
                <div>
                  <strong>Date:</strong>{" "}
                  {order.createdAt?.toDate().toLocaleString() || "N/A"}
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="user-profile__products">
                    <strong>Products:</strong>
                    <ul className="user-profile__product-list">
                      {order.items.map((item, index) => (
                        <li key={index} className="user-profile__product-item">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="user-profile__product-img"
                          />
                          <div>
                            <p><strong>{item.name}</strong></p>
                            <p>Qty: {item.amount}</p>
                            <p>Price: ₹{item.price}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="user-profile__order-actions">
                  <button
                    className="user-profile__btn delete"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete Order
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="user-profile__text">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
