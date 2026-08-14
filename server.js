const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- DATABASE SETUP ----------------
const db = new sqlite3.Database(path.join(__dirname, "database.sqlite"), (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to SQLite database!");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    roll_no TEXT,
    course TEXT,
    email TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS marks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    subject TEXT,
    marks_obtained INTEGER,
    total_marks INTEGER,
    grade TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    total_classes INTEGER,
    attended_classes INTEGER,
    percentage REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS timetable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT,
    period_time TEXT,
    subject TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS improvement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    subject TEXT,
    suggestion TEXT
  )`);

  console.log("All tables ready!");
});

// ---------------- NOTIFICATIONS ----------------
app.get("/api/notifications", (req, res) => {
  db.all("SELECT * FROM notifications ORDER BY date DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/notifications", (req, res) => {
  const { message } = req.body;
  db.run("INSERT INTO notifications (message) VALUES (?)", [message], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// ---------------- STUDENTS ----------------
app.get("/api/students", (req, res) => {
  db.all("SELECT * FROM students", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/students", (req, res) => {
  const { name, roll_no, course, email } = req.body;
  db.run(
    "INSERT INTO students (name, roll_no, course, email) VALUES (?, ?, ?, ?)",
    [name, roll_no, course, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// ---------------- MARKS ----------------
app.get("/api/marks", (req, res) => {
  db.all("SELECT * FROM marks", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/marks", (req, res) => {
  const { student_id, subject, marks_obtained, total_marks, grade } = req.body;
  db.run(
    "INSERT INTO marks (student_id, subject, marks_obtained, total_marks, grade) VALUES (?, ?, ?, ?, ?)",
    [student_id, subject, marks_obtained, total_marks, grade],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// ---------------- ATTENDANCE ----------------
app.get("/api/attendance", (req, res) => {
  db.all("SELECT * FROM attendance", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/attendance", (req, res) => {
  const { student_id, total_classes, attended_classes, percentage } = req.body;
  db.run(
    "INSERT INTO attendance (student_id, total_classes, attended_classes, percentage) VALUES (?, ?, ?, ?)",
    [student_id, total_classes, attended_classes, percentage],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// ---------------- TIMETABLE ----------------
app.get("/api/timetable", (req, res) => {
  db.all("SELECT * FROM timetable", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/timetable", (req, res) => {
  const { day, period_time, subject } = req.body;
  db.run(
    "INSERT INTO timetable (day, period_time, subject) VALUES (?, ?, ?)",
    [day, period_time, subject],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// ---------------- IMPROVEMENT ----------------
app.get("/api/improvement", (req, res) => {
  db.all("SELECT * FROM improvement", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/improvement", (req, res) => {
  const { student_id, subject, suggestion } = req.body;
  db.run(
    "INSERT INTO improvement (student_id, subject, suggestion) VALUES (?, ?, ?)",
    [student_id, subject, suggestion],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// ---------------- SERVER ----------------
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

