// src/components/admin/AdminProducts.jsx
import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ProductFormModal from "./formmodal";
import ConfirmDeleteModal from "./confirmdelete";
import "../../styles/pages.css";

const dummyProducts = [
  {
    id: 1,
    name: "Premium Dog Food",
    price: 2500,
    stock: 14,
    image: "/dog-food.jpg",
    type: "Food",
  },
  {
    id: 2,
    name: "Cat Scratching Post",
    price: 1800,
    stock: 8,
    image: "/cat-post.jpg",
    type: "Accessories",
  },
];

export default function AdminProducts() {
  const [products, setProducts] = useState(dummyProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleSave = (productData) => {
    if (productData.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? productData : p))
      );
    } else {
      const newProduct = {
        ...productData,
        id: Date.now(),
        image: productData.image || "/default-product.jpg",
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setIsFormOpen(false);
  };

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    setIsDeleteOpen(false);
  };

  return (
    <div className="admin-products-page">
      <div className="admin-header">
        <h2>Manage Products</h2>
        <button className="add-btn" onClick={handleAdd}>
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="product-cards">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="card-info">
              <h4>{product.name}</h4>
              <p>Type: {product.type}</p>
              <p>Price: KES {product.price}</p>
              <p>Stock: {product.stock}</p>
              <div className="card-actions">
                <button onClick={() => handleEdit(product)}><FaEdit /> Edit</button>
                <button onClick={() => handleDelete(product)}><FaTrash /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <ProductFormModal
          product={selectedProduct}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}

      {isDeleteOpen && (
        <ConfirmDeleteModal
          product={selectedProduct}
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteOpen(false)}
        />
      )}
    </div>
  );
}
