import React, { useEffect, useState } from "react";
import "../../styles/pages.css"

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/order/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteDelivery = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/order/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ delivery_status: "Completed" }),
      });

      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? updatedOrder.order : order
          )
        );
      } else {
        console.error("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating delivery status:", err);
    }
  };

  return (
    <div className="admin-content">
      <h2>Order Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Status</th>
            <th>Paid</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5">No orders found.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.user_id}</td>
                <td>{order.delivery_status}</td>
                <td>{order.is_paid ? "Yes" : "No"}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>
                  {order.delivery_status !== "Completed" && (
                    <button
                      className="btn"
                      onClick={() => handleCompleteDelivery(order.id)}
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
