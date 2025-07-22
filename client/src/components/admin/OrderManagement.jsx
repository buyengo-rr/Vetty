import React, { useState, useEffect } from "react";


const dummyOrders = [
  {
    id: 1,
    customer: "John Doe",
    service: "Haircut",
    time: "Monday 10:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    service: "Massage",
    time: "Tuesday 11:00 AM",
    status: "Completed",
  },
  {
    id: 3,
    customer: "Alice Johnson",
    service: "Consultation",
    time: "Wednesday 1:00 PM",
    status: "Pending",
  },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    setOrders(dummyOrders);
  }, []);

  const handleComplete = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Completed" } : order
      )
    );
  };

  const handleCancel = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Order Management</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.service}</td>
              <td>{order.time}</td>
              <td>{order.status}</td>
              <td>
                {order.status !== "Completed" && (
                  <button
                    style={buttonComplete}
                    onClick={() => handleComplete(order.id)}
                  >
                    Complete
                  </button>
                )}
                <button
                  style={buttonCancel}
                  onClick={() => handleCancel(order.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const containerStyle = {
  padding: "1rem",
  maxWidth: "800px",
  margin: "auto",
};

const titleStyle = {
  fontSize: "1.5rem",
  marginBottom: "1rem",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const buttonComplete = {
  backgroundColor: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "0.25rem 0.5rem",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "0.5rem",
};

const buttonCancel = {
  backgroundColor: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "0.25rem 0.5rem",
  borderRadius: "4px",
  cursor: "pointer",
};
