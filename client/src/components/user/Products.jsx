import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import "../../styles/pages.css"; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/product") 
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(setProducts)
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="products-page">
      <h2 className="products-title">Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={`http://127.0.0.1:5000${product.image_url}`}
              alt={product.name}
              className="product-img"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">KES {product.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
