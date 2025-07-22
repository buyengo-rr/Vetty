// src/components/admin/ProductFormModal.jsx
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function ProductFormModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    type: "Food",
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || "",
        type: product.type || "Food",
      });
      setPreview(product.image || "");
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock || !form.type) {
      alert("All fields are required!");
      return;
    }

    const data = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      id: product?.id,
      image: preview,
    };

    onSave(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{product ? "Edit Product" : "Add Product"}</h3>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="Food">Food</option>
            <option value="Toys">Toys</option>
            <option value="Accessories">Accessories</option>
          </select>

          <label>Price (KES)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          <label>Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} required />

          <label>Product Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}

          <button type="submit" className="save-btn">
            {product ? "Update" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
}
