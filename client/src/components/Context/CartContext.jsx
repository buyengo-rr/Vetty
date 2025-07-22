// src/context/CartContext.js
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        toast.info(`Increased quantity of "${product.name}"`);
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`Added "${product.name}" to cart`);
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + amount;
          if (newQty <= 0) {
            toast.warn(`Removed "${item.name}" from cart`);
            return null;
          } else {
            toast.info(
              `${amount > 0 ? "Increased" : "Decreased"} quantity of "${item.name}"`
            );
            return { ...item, quantity: newQty };
          }
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeItem = (productId) => {
    const product = cartItems.find(i => i.id === productId);
    if (product) toast.error(`Removed "${product.name}" from cart`);
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    toast.warn("Cart cleared");
    setCartItems([]);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
