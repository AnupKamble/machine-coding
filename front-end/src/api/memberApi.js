import axios from "axios";

export const getMembers = async (pageNum, limit) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/students_paginated",
      {
        params: {
          page: pageNum,
          limit: limit,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching paginated students:", error);
  }
};

export const addMember = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/students",
      formData
    );
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

export const deleteMember = async (email) => {
  try {
    await axios.delete(`http://localhost:3000/students/delete/${email}`);
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

export const updateMember = async (data) => {
 try {
  const res = await fetch("http://localhost:3000/students/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
 }
  catch (error) {
  console.error("Error updating member:", error);
  throw error;
  }
};
