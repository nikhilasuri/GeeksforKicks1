import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import "./AdminAddShoePage.css";

const AdminAddShoePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    size: "",
  });
  const [status, setStatus] = useState("");
  const [shoes, setShoes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    image: "",
    size: "",
  });

  const fetchShoes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shoes"));
      const shoesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShoes(shoesData);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Adding...");

    try {
      const price = parseFloat(formData.price);
      if (isNaN(price)) {
        setStatus("❌ Price must be a number");
        return;
      }

      await addDoc(collection(db, "shoes"), {
        name: formData.name,
        price,
        image: formData.image,
        size: formData.size,
      });

      setFormData({ name: "", price: "", image: "", size: "" });
      setStatus("✅ Shoe added successfully!");
      fetchShoes();
    } catch (error) {
      console.error("Error adding shoe:", error);
      setStatus("❌ Failed to add shoe");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "shoes", id));
      fetchShoes();
    } catch (error) {
      console.error("Error deleting shoe:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (shoe) => {
    setEditingId(shoe.id);
    setEditData({
      name: shoe.name,
      price: shoe.price,
      image: shoe.image,
      size: shoe.size,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: "", price: "", image: "", size: "" });
  };

  const handleUpdate = async (id) => {
    try {
      const price = parseFloat(editData.price);
      if (isNaN(price)) {
        setStatus("❌ Price must be a number");
        return;
      }

      await updateDoc(doc(db, "shoes", id), {
        name: editData.name,
        price,
        image: editData.image,
        size: editData.size,
      });

      setStatus("✅ Shoe updated!");
      setEditingId(null);
      fetchShoes();
    } catch (error) {
      console.error("Error updating shoe:", error);
      setStatus("❌ Failed to update shoe");
    }
  };

  return (
    <div className="add-shoe-container">
      <h2>Add a New Shoe</h2>
      <form onSubmit={handleSubmit} className="add-shoe-form">
        <label>
          Shoe Name:
          <input
            type="text"
            name="name"
            placeholder="Nike Air Max..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price ($):
          <input
            type="number"
            name="price"
            placeholder="99.99"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </label>

        <label>
          Image URL:
          <input
            type="url"
            name="image"
            placeholder="https://image-link.com/shoe.png"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Size:
          <input
            type="text"
            name="size"
            placeholder="e.g., 9, 10.5, 11"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Shoe</button>
      </form>

      {status && <p className="status-msg">{status}</p>}

      <hr style={{ margin: "40px 0" }} />

      <h3>All Stored Shoes</h3>
      <div className="shoe-grid">
        {shoes.length > 0 ? (
          shoes.map((shoe) => (
            <div key={shoe.id} className="shoe-card">
              {editingId === shoe.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    step="0.01"
                  />
                  <input
                    type="url"
                    name="image"
                    value={editData.image}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="size"
                    value={editData.size}
                    onChange={handleEditChange}
                  />
                  <div className="edit-btns">
                    <button onClick={() => handleUpdate(shoe.id)}>💾 Save</button>
                    <button onClick={cancelEdit}>✖ Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <img src={shoe.image} alt={shoe.name} />
                  <h4>{shoe.name}</h4>
                  <p>${shoe.price.toFixed(2)}</p>
                  <p>Size: {shoe.size}</p>
                  <div className="card-buttons">
                    <button onClick={() => startEditing(shoe)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(shoe.id)}>🗑️ Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No shoes added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAddShoePage;
