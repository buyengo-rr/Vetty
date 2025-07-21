import React from 'react';

const ProductDetail = ({ product }) => {
  if (!product) {
    return <div>Select a product to see details</div>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        {/* Additional product details can be added here */}
      </div>
    </div>
  );
};

export default ProductDetail;
