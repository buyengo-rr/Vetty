import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "mpesa",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all the fields.");
      return;
    }

   
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/user/products"); 
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>

          <label>
            Address:
            <textarea name="address" value={formData.address} onChange={handleChange} />
          </label>

          <label>
            Payment Method:
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option value="mpesa">M-Pesa</option>
            </select>
          </label>

          <button type="submit">Place Order</button>
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} — KES {item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total: KES {total.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}
