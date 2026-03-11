// -----------------------------------
// MOTIVATION (unchanged)
// -----------------------------------
function showMotivation() {
  const quotes = [
    "Keep pushing! Success is closer than you think.",
    "Believe in yourself and all that you are!",
    "You’re capable of amazing things!",
    "Don’t stop until you’re proud."
  ];
  alert(quotes[Math.floor(Math.random() * quotes.length)]);
}

// -----------------------------------
// ADD NOTICE (unchanged)
// -----------------------------------
function addNotice() {
  const input = document.getElementById("newNotice");
  const noticeList = document.getElementById("noticeList");

  const text = input.value.trim();
  if (text === "") {
    alert("Please type something before adding!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = text;
  noticeList.appendChild(li);

  input.value = "";  
  alert("✅ Notice added successfully!");
}

// -----------------------------------
// BACKEND SETTINGS
// -----------------------------------
const BASE = "http://localhost:5000/api"; 
const STUDENT_EMAIL = "aman@example.com";  // replace if different

// Get student ID from backend using email
async function getStudentId() {
  try {
    const r = await fetch(`${BASE}/students/email/${STUDENT_EMAIL}`);
    const data = await r.json();
    return data._id;
  } catch (err) {
    console.error("Could not fetch student ID", err);
    return null;
  }
}

// -----------------------------------
// REAL ATTENDANCE FROM BACKEND
// -----------------------------------
async function calculateAttendance() {
  const studentId = await getStudentId();
  if (!studentId) return;

  // Fetch last 30 days attendance
  const r = await fetch(`${BASE}/attendance/heatmap/${studentId}?days=30`);
  const arr = await r.json();

  const total = arr.length;
  const present = arr.filter(x => x.status === "present").length;
  const absent = total - present;
  const percent = total ? ((present / total) * 100).toFixed(1) : "0.0";

  // Update HTML
  if (document.getElementById("totalDays")) {
    document.getElementById("totalDays").textContent = total;
  }
  if (document.getElementById("presentDays")) {
    document.getElementById("presentDays").textContent = present;
  }
  if (document.getElementById("absentDays")) {
    document.getElementById("absentDays").textContent = absent;
  }
  if (document.getElementById("percent")) {
    document.getElementById("percent").textContent = percent + "%";
  }
}
// ---------------- ADMIN LOGIN ----------------

function adminLogin() {

let user = document.getElementById("adminUser").value;
let pass = document.getElementById("adminPass").value;

if (user === "admin" && pass === "1234") {

alert("Login successful");
window.location.href = "admin/admin-dashboard.html";


} 
else {

alert("Invalid username or password");

}

}


// ---------------- ADD STUDENT ----------------

function addStudent() {

let name = document.getElementById("name").value;
let id = document.getElementById("studentId").value;

if(name === "" || id === ""){
alert("Please enter all details");
return;
}

let students = JSON.parse(localStorage.getItem("students")) || [];

students.push({
name: name,
id: id
});

localStorage.setItem("students", JSON.stringify(students));

alert("Student added successfully");

document.getElementById("name").value = "";
document.getElementById("studentId").value = "";

displayStudents();

}


// ---------------- DISPLAY STUDENTS ----------------

function displayStudents(){

let students = JSON.parse(localStorage.getItem("students")) || [];
let table = document.getElementById("studentTable");

if(!table) return;

table.innerHTML = "";

students.forEach((student,index)=>{

let row = `
<tr>
<td>${student.name}</td>
<td>${student.id}</td>
<td><button onclick="deleteStudent(${index})">Delete</button></td>
</tr>
`;

table.innerHTML += row;

});

}


// ---------------- DELETE STUDENT ----------------

function deleteStudent(index){

let students = JSON.parse(localStorage.getItem("students")) || [];

students.splice(index,1);

localStorage.setItem("students", JSON.stringify(students));

displayStudents();

}


// ---------------- ADD MARKS ----------------

function addMarks(){

let subject = document.getElementById("subject").value;
let marks = document.getElementById("marks").value;

if(subject === "" || marks === ""){
alert("Enter subject and marks");
return;
}

let markList = JSON.parse(localStorage.getItem("marks")) || [];

markList.push({
subject: subject,
marks: marks
});

localStorage.setItem("marks", JSON.stringify(markList));

alert("Marks added successfully");

displayMarks();

}


// ---------------- DISPLAY MARKS ----------------

function displayMarks(){

let markList = JSON.parse(localStorage.getItem("marks")) || [];
let table = document.getElementById("marksTable");

if(!table) return;

table.innerHTML = "";

markList.forEach((m)=>{

let row = `
<tr>
<td>${m.subject}</td>
<td>${m.marks}</td>
</tr>
`;

table.innerHTML += row;

});

}
// -----------------------------------
// DISPLAY NOTIFICATIONS FROM BACKEND
// -----------------------------------
async function displayNotifications() {

  try {

    let res = await fetch(`${BASE}/notifications`);

    let notes = await res.json();

    let list = document.getElementById("notificationList");

    if (!list) return;

    list.innerHTML = "";

    notes.forEach(n => {

      list.innerHTML += `<p>📢 ${n.message}</p>`;

    });

  } catch (err) {

    console.error("Error loading notifications", err);

  }

}


// -----------------------------------
// RUN WHEN PAGE LOADS
// -----------------------------------
document.addEventListener("DOMContentLoaded", () => {

  displayNotifications();

  calculateAttendance();

});


