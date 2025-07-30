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

const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.phone || !formData.address) {
    toast.error("Please fill in all the fields.");
    return;
  }

  const orderData = {
    name: formData.name,
    phone: formData.phone,
    address: formData.address,
    payment_method: formData.paymentMethod,
    total: total,
    is_paid: true, // assuming paid on checkout
    products: cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
    })),
  };

  try {
    const res = await fetch("http://localhost:5000/order/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/user/products");
    } else {
      toast.error(data.error || "Failed to place order.");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    toast.error("An error occurred. Try again.");
  }
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
