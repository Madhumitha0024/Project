// ---------------- ADMIN LOGIN ----------------

function adminLogin() {
  let user = document.getElementById("adminUser").value;
  let pass = document.getElementById("adminPass").value;

  if (user === "admin" && pass === "1234") {
    alert("Login Successful");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Invalid username or password");
  }
}


// ---------------- ADD STUDENT ----------------

async function addStudent() {
  let name = document.getElementById("name").value;
  let id = document.getElementById("studentId").value;

  if (name === "" || id === "") {
    alert("Enter student details");
    return;
  }

  await fetch("http://localhost:5000/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, roll_no: id })
  });

  alert("Student Added Successfully");

  document.getElementById("name").value = "";
  document.getElementById("studentId").value = "";

  displayStudents();
}


// ---------------- DISPLAY STUDENTS ----------------

async function displayStudents() {
  let table = document.getElementById("studentTable");
  if (!table) return;

  const res = await fetch("http://localhost:5000/api/students");
  const students = await res.json();

  table.innerHTML = "";

  students.forEach((s) => {
    let row = `
      <tr>
        <td>${s.name}</td>
        <td>${s.roll_no}</td>
        <td><button onclick="deleteStudent(${s.id})">Delete</button></td>
      </tr>
    `;
    table.innerHTML += row;
  });
}


// ---------------- DELETE STUDENT ----------------

async function deleteStudent(id) {
  await fetch(`http://localhost:5000/api/students/${id}`, {
    method: "DELETE"
  });

  displayStudents();
}


// ---------------- ADD MARKS ----------------

async function addMarks() {
  let name = document.getElementById("studentName").value;
  let subject = document.getElementById("subject").value;
  let marks = document.getElementById("marks").value;

  if (name === "" || subject === "" || marks === "") {
    alert("Please fill all fields");
    return;
  }

  await fetch("http://localhost:5000/api/marks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_name: name,
      subject: subject,
      marks_obtained: Number(marks),
      total_marks: 100
    })
  });

  alert("Marks Added Successfully");

  document.getElementById("studentName").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("marks").value = "";
}


// ---------------- ADD NOTIFICATION ----------------

async function sendNotification() {
  let message = document.getElementById("notificationText").value;

  if (message === "") {
    alert("Enter notification message");
    return;
  }

  await fetch("http://localhost:5000/api/notifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message })
  });

  alert("Notification sent successfully");

  document.getElementById("notificationText").value = "";
}


// ---------------- ADD ATTENDANCE ----------------

async function addAttendance() {
  let total = document.getElementById("totalClasses").value;
  let attended = document.getElementById("attendedClasses").value;

  if (total === "" || attended === "") {
    alert("Please fill all fields");
    return;
  }

  const percentage = (Number(attended) / Number(total)) * 100;

  await fetch("http://localhost:5000/api/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: 1,
      total_classes: Number(total),
      attended_classes: Number(attended),
      percentage: percentage
    })
  });

  alert("Attendance Added Successfully");

  document.getElementById("totalClasses").value = "";
  document.getElementById("attendedClasses").value = "";
}


// ---------------- ADD TIMETABLE ----------------

async function addTimetable() {
  let day = document.getElementById("day").value;
  let time = document.getElementById("periodTime").value;
  let subject = document.getElementById("timetableSubject").value;

  if (day === "" || time === "" || subject === "") {
    alert("Please fill all fields");
    return;
  }

  await fetch("http://localhost:5000/api/timetable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      day: day,
      period_time: time,
      subject: subject
    })
  });

  alert("Timetable Entry Added Successfully");

  document.getElementById("day").value = "";
  document.getElementById("periodTime").value = "";
  document.getElementById("timetableSubject").value = "";
}


// ---------------- ADD IMPROVEMENT ----------------

async function addImprovement() {
  let subject = document.getElementById("improvementSubject").value;
  let suggestion = document.getElementById("suggestion").value;

  if (subject === "" || suggestion === "") {
    alert("Please fill all fields");
    return;
  }

  await fetch("http://localhost:5000/api/improvement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: 1,
      subject: subject,
      suggestion: suggestion
    })
  });

  alert("Improvement Suggestion Added Successfully");

  document.getElementById("improvementSubject").value = "";
  document.getElementById("suggestion").value = "";
}


