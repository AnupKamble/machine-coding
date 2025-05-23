import React, { useState, useEffect } from "react";
import styles from "../styles/MemberForm.module.css";
import { addMember, updateMember } from "../api/memberApi";

export default function MemberForm({ initialData, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    parentId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        age: initialData.age || "",
        parentId: initialData.parentId || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await updateMember(formData);
      } else {
        await addMember(formData);
      }
      onClose();
    } catch (e) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{initialData ? "Update Student" : "Add New Student"}</h3>
          <button className={styles.closebutton} onClick={onClose}>
            ×
          </button>
        </div>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <label>Student Name*</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label>Student Email*</label>
          <input
            disabled={initialData ? true : false}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label>Student Age*</label>
          <input
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
          <label>Student Parent Id</label>
          <input
            value={formData.parentId}
            onChange={(e) =>
              setFormData({ ...formData, parentId: e.target.value })
            }
          />
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitBtn}>
              {initialData ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
