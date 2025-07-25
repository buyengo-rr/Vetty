import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";


export default function ConfirmDeleteModal({ product, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal confirm-modal">
        <FaExclamationTriangle className="warning-icon" />
        <h3>Delete Product</h3>
        <p>Are you sure you want to delete <strong>{product.name}</strong>?</p>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="delete-btn" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}
