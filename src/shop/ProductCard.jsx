import React from 'react';
import { useCart } from '../../client/src/components/Context/CartContext'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">KES {product.price.toFixed(2)}</p>
        <button onClick={handleAddToCart} className="add-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
