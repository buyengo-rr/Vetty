import React, { useState, useEffect } from "react";
import ProductFormModal from "./formmodal";
import ConfirmDeleteModal from "./confirmdelete";
import "../../styles/pages.css";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/product", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
      alert("Login as admin to view products.");
    }
  };

  const handleSave = async (formData) => {
    try {
      const payload = new FormData();
      for (let key in formData) {
        payload.append(key, formData[key]);
      }

      const response = await fetch(
        editProduct
          ? `http://localhost:5000/admin/product/${formData.id}`
          : "http://localhost:5000/admin/product",
        {
          method: editProduct ? "PUT" : "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: payload,
        }
      );

      if (!response.ok) throw new Error("Failed to save");

      await fetchProducts();
      setShowModal(false);
      setEditProduct(null);
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/admin/product/${deleteProduct.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      await fetchProducts();
      setDeleteProduct(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="admin-product-page">
      <h2>Admin Product Management</h2>
      <button onClick={() => setShowModal(true)}>Add Product</button>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
           {p.image_url && (
            <img
                src={`http://localhost:5000${p.image_url}`}
                alt={p.name}
               className="product-image"
           />
             )}

            <div className="product-details">
              <h4>{p.name}</h4>
              <p>Type: {p.type}</p>
              <p>Price: {p.price} KES</p>
              <p>Stock: {p.stock}</p>
            </div>
            <div className="product-actions">
              <button
                onClick={() => {
                  setEditProduct(p);
                  setShowModal(true);
                }}
              >
                Edit
              </button>
              <button onClick={() => setDeleteProduct(p)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <ProductFormModal
        product={editProduct}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setEditProduct(null);
        }}
        onSave={handleSave}
      />

      {deleteProduct && (
        <ConfirmDeleteModal
          product={deleteProduct}
          onConfirm={handleDelete}
          onCancel={() => setDeleteProduct(null)}
        />
      )}
    </div>
  );
};

export default AdminProductPage;
