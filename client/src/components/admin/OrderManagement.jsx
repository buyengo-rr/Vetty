import React, { useState, useEffect } from "react";

const dummyOrders = [
  {
    id: 1,
    customer: "John Doe",
    product: "Laptop",
    quantity: 1,
    deliveryDate: "2024-07-25",
    address: "123 Main St, Nairobi",
    payment: "Pending",
    deliveryStatus: "Pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    product: "Phone",
    quantity: 2,
    deliveryDate: "2024-07-22",
    address: "456 Kenyatta Ave, Nairobi",
    payment: "Completed",
    deliveryStatus: "Completed",
  },
  {
    id: 3,
    customer: "Alice Johnson",
    product: "Tablet",
    quantity: 1,
    deliveryDate: "2024-07-27",
    address: "789 Moi Rd, Nairobi",
    payment: "Pending",
    deliveryStatus: "Pending",
  },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(dummyOrders);

    
    const timer = setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) =>
          order.payment === "Pending"
            ? { ...order, payment: "Completed" }
            : order
        )
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCompleteDelivery = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, deliveryStatus: "Completed" }
          : order
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Order Management</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Delivery Date</th>
              <th>Address</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                  height: "60px",
                }}
              >
                <td style={styles.cell}>{order.customer}</td>
                <td style={styles.cell}>{order.product}</td>
                <td style={styles.cell}>{order.quantity}</td>
                <td style={styles.cell}>{order.deliveryDate}</td>
                <td style={styles.cell}>{order.address}</td>
                <td style={styles.cell}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor:
                        order.payment === "Completed" ? "#d1fae5" : "#fee2e2",
                      color:
                        order.payment === "Completed" ? "#065f46" : "#991b1b",
                    }}
                  >
                    {order.payment}
                  </span>
                </td>
                <td style={styles.cell}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor:
                        order.deliveryStatus === "Completed"
                          ? "#d1fae5"
                          : "#fef9c3",
                      color:
                        order.deliveryStatus === "Completed"
                          ? "#065f46"
                          : "#92400e",
                    }}
                  >
                    {order.deliveryStatus}
                  </span>
                </td>
                <td style={styles.cell}>
                  {order.deliveryStatus === "Pending" && (
                    <button
                      onClick={() => handleCompleteDelivery(order.id)}
                      style={styles.actionButton}
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#1f2937",
  },
  tableWrapper: {
    overflowX: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    borderRadius: "8px",
    background: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    minWidth: "1000px",
  },
  cell: {
    padding: "12px 16px",
    textAlign: "left",
  },
  badge: {
    fontWeight: "500",
    fontSize: "0.875rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "12px",
    display: "inline-block",
  },
  actionButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.75rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "background 0.2s ease-in-out",
  },
};
