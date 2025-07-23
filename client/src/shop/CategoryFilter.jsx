import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={category === selectedCategory ? 'active' : ''}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
