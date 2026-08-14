const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "database.sqlite"));

db.serialize(() => {
  db.run(`INSERT INTO students (name, roll_no, course, email) VALUES 
    ('Madhumitha S', 'CS101', 'B.Tech IT', 'madhumitha20024@gmail.com')`);

  db.run(`INSERT INTO marks (student_id, subject, marks_obtained, total_marks, grade) VALUES 
    (1, 'Database Management', 85, 100, 'A'),
    (1, 'Web Development', 90, 100, 'A+'),
    (1, 'Data Structures', 78, 100, 'B+')`);

  db.run(`INSERT INTO attendance (student_id, total_classes, attended_classes, percentage) VALUES 
    (1, 60, 54, 90.0)`);

  db.run(`INSERT INTO timetable (day, period_time, subject) VALUES 
    ('Monday', '9:00 - 10:00', 'Database Management'),
    ('Monday', '10:00 - 11:00', 'Web Development'),
    ('Tuesday', '9:00 - 10:00', 'Data Structures')`);

  db.run(`INSERT INTO notifications (message) VALUES 
    ('Mid-semester exams start next week'),
    ('Submit your project report by Friday')`);

  db.run(`INSERT INTO improvement (student_id, subject, suggestion) VALUES 
    (1, 'Data Structures', 'Practice more problems on trees and graphs')`);

  console.log("Sample data added!");
});

db.close();