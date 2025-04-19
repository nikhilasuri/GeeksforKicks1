// src/context/Context.js
import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}, // 🔹 added clearCart method
});

export default CartContext;
