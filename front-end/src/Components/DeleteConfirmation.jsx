import React from "react";
import styles from "../styles/DeleteConfirmation.module.css";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.icon}>⚠️</div>
        <p><strong>Are you sure?</strong></p>
        <p>If you delete this Student Then this action can not be undone.</p>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>Yes, delete it!</button>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
