import React, { useEffect, useState } from "react";
import styles from "../styles/MemberList.module.css";
import { getMembers, deleteMember } from "../api/memberApi";
import MemberForm from "./MemberForm";
import DeleteConfirmation from "./DeleteConfirmation";

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(1);
  const options = [5, 10, 15];

  useEffect(() => {
    fetchMembers();
  }, [page, limit]);

  const fetchMembers = async () => {
    const data = await getMembers(page, limit);
    setMembers(data.students);
    setTotal(data.total);
  };

  const handleDelete = async (id) => {
    await deleteMember(id);
    fetchMembers();
    setShowDelete(null);
  };

  const handleEdit = (member) => {
    setEditMember(member);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setLimit(Number(e.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>All Student</h1>
      </div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Student" className={styles.searchInput} />
        <button
          onClick={() => {
            setShowForm(true);
            setEditMember(null);
          }}
          className={styles.addBtn}
        >
          Add New Student
        </button>
      </div>

      {/* <input type="text" placeholder="QA" className={styles.searchInput} /> */}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, index) => (
            <tr
              key={index + 1}
              className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.age}</td>
              <td>
                <button
                  className={styles.updateBtn}
                  onClick={() => handleEdit(m)}
                >
                  ✏️
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setShowDelete(m.email)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="red"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm1 2h4v1h-4V5zm-2 3h10v12H8V8zm2 2v8h2v-8H10zm4 0v8h2v-8h-2z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer}>
        <div className={styles.entriesControl}>
          Show{" "}
          <select value={limit} onChange={handleChange}>
            {options.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>{" "}
          entries
        </div>
        <div className={styles.pagination}>
          <button
            onClick={() => setPage(1)}
            disabled={page === 1 || total === 1}
          >
            First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || total === 1}
          >
            Previous
          </button>
          <button className={styles.pageNumber}>{page}</button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, total))}
            disabled={page === total || total === 1}
          >
            Next
          </button>
          <button
            onClick={() => setPage(total)}
            disabled={page === total || total === 1}
          >
            Last
          </button>
        </div>
      </div>

      {showForm && (
        <MemberForm
          initialData={
            editMember ? { ...editMember, parentId: editMember.parentid } : null
          }
          onClose={() => {
            setShowForm(false);
            fetchMembers();
          }}
        />
      )}

      {showDelete && (
        <DeleteConfirmation
          onConfirm={() => handleDelete(showDelete)}
          onCancel={() => setShowDelete(null)}
        />
      )}
    </div>
  );
}
