import React, { useContext, useState } from "react";
import CartContext from "../../context/Context";
import { AuthContext } from "../../AuthProvider"; // ✅ import AuthContext
import "./checkoutpage.css";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { currentUser } = useContext(AuthContext); // ✅ get user email
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        items: cartContext.items,
        totalAmount: cartContext.totalAmount,
        shippingInfo,
        email: currentUser?.email || "Guest", // ✅ include user email
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);

      console.log("Order placed:", orderData);
      alert("Order placed successfully!");
      navigate("/");

      if (cartContext.clearCart) {
        cartContext.clearCart();
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <section className="checkout">
      <div className="checkout__content">
        <h2 className="checkout__title">Checkout</h2>

        <div className="checkout__form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={shippingInfo.country}
                onChange={handleInputChange}
                required
              />
            </div>

            <h3>Total: {totalAmount}</h3>

            <button type="submit" className="btn checkout__btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
