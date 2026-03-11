const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let notifications = [];
let students = [];
let marks = [];

// ---------------- NOTIFICATIONS ----------------

app.get("/api/notifications", (req, res) => {
  res.json(notifications);
});

app.post("/api/notifications", (req, res) => {

  const message = req.body.message;

  notifications.push({ message });

  res.json({ success: true });

});


// ---------------- STUDENTS ----------------

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.post("/api/students", (req, res) => {

  students.push(req.body);

  res.json({ success: true });

});


// ---------------- MARKS ----------------

app.get("/api/marks", (req, res) => {
  res.json(marks);
});

app.post("/api/marks", (req, res) => {

  marks.push(req.body);

  res.json({ success: true });

});


// ---------------- SERVER ----------------

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});