const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE mentors (id INTEGER PRIMARY KEY, name TEXT, availability TEXT, areas_of_expertise TEXT, is_premium BOOLEAN)");
  db.run("CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, availability TEXT, area_of_interest TEXT)");
  db.run("CREATE TABLE bookings (id INTEGER PRIMARY KEY, student_id INTEGER, mentor_id INTEGER, scheduled_time TEXT, status TEXT)");
});

// API to get all mentors based on student's area of interest and availability
app.get('/mentors', (req, res) => {
  const { area_of_interest } = req.query;
  db.all("SELECT * FROM mentors WHERE areas_of_expertise LIKE ?", [`%${area_of_interest}%`], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// API to create a new booking
app.post('/bookings', (req, res) => {
  const { student_id, mentor_id, scheduled_time, status } = req.body;
  db.run("INSERT INTO bookings (student_id, mentor_id, scheduled_time, status) VALUES (?, ?, ?, ?)", [student_id, mentor_id, scheduled_time, status], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).json({ booking_id: this.lastID });
    }
  });
});

// API to get bookings for a specific student or mentor
app.get('/bookings', (req, res) => {
  const { student_id, mentor_id } = req.query;
  let query = "SELECT * FROM bookings WHERE ";
  if (student_id) query += `student_id = ${student_id}`;
  if (mentor_id) query += `mentor_id = ${mentor_id}`;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
