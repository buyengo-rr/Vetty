import React, { useState, useEffect } from "react";
import "../../styles/pages.css";

const ProductFormModal = ({ visible, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    image: "",
    type: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: "",
        name: "",
        price: "",
        stock: "",
        image: "",
        type: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{product ? "Edit Product" : "Add Product"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
            required
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="form-actions">
            <button type="submit">{product ? "Update" : "Save"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
