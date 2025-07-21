import React from 'react';
import ProductList from '../../../src/shop/ProductList';
import '../styles/components.css'


const sampleProducts = [
  { id: 1, name: 'Dog Food', category: 'Food', price: 20 },
  { id: 2, name: 'Cat Toy', category: 'Toys', price: 10 },
  { id: 3, name: 'Bird Cage', category: 'Accessories', price: 50 },
];

const Products = () => {
  return (
    <div>
      <h1>Shop Products</h1>
      <ProductList products={sampleProducts} />
    </div>
  );
};

export default Products;
