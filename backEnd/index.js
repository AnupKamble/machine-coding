const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());





//--------------- PostgreSQL connection -------------------


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Database connection error', err));




// ------------------- STUDENT CRUD ------------------- //

// Create a student
app.post('/students', async (req, res) => {
  const { name, email, age, parentId } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO students (name, email, age, parentId)
       VALUES ($1, $2, $3, $4 ) RETURNING *`,
      [name, email, age, parentId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY email');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/students/:email', async (req, res) => {
  const email = req.params.email;
 console.log(email)
  try {
    // Fetch student by email
    const studentResult = await pool.query(
      'SELECT * FROM students WHERE email = $1',
      [email]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch marks by email
    const marksResult = await pool.query(
      'SELECT score FROM marks WHERE email = $1',
      [email]
    );

    res.json({
      ...studentResult.rows[0],
      marks: marksResult.rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Update student
app.put('/students/update', async (req, res) => {
  const { name, email, age } = req.body;
//  console.log(req.body)
  try {
    const result = await pool.query(
      `UPDATE students
       SET name = $1, age = $2
       WHERE email = $3 RETURNING *`,
      [name, age, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    // console.log(res.json(result.rows[0]))
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Delete student
app.delete('/students/delete/:email', async (req, res) => {
  const email = req.params.email;
  try {
    await pool.query('DELETE FROM students WHERE email = $1', [email]);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ------------------- MARKS ------------------- //


app.post('/students/marks', async (req, res) => {
  // const email = req.params.email;
  const { score, email } = req.body;
console.log(req.body)
console.log(email)
  try {
    // Step 1: Check if the student exists
    const studentCheck = await pool.query(
      'SELECT * FROM students WHERE email = $1',
      [email]
    );

    // console.log(studentCheck)

    if (studentCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Step 2: Insert mark using email
    const result = await pool.query(
      `INSERT INTO marks (email, score)
       VALUES ($1, $2)
       RETURNING *`,
      [email, score]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ------------------- PAGINATION ------------------- //

// Paginated students
app.get('/students_paginated', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
//  console.log(req)
  try {
    const totalRes = await pool.query('SELECT COUNT(*) FROM students');
    const total = parseInt(totalRes.rows[0].count);

    const result = await pool.query(
      `SELECT * FROM students ORDER BY email LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      total: Math.ceil(total / limit),
      students: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// ------------------- START SERVER ------------------- //

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
