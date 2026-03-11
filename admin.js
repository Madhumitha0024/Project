// ---------------- ADMIN LOGIN ----------------

function adminLogin(){

let user = document.getElementById("adminUser").value;
let pass = document.getElementById("adminPass").value;

if(user === "admin" && pass === "1234"){

alert("Login Successful");
 window.location.href = "admin-dashboard.html";

}
else{

alert("Invalid username or password");

}

}


// ---------------- ADD STUDENT ----------------

function addStudent(){

let name = document.getElementById("name").value;
let id = document.getElementById("studentId").value;

if(name === "" || id === ""){
alert("Enter student details");
return;
}

let students = JSON.parse(localStorage.getItem("students")) || [];

students.push({
name:name,
id:id
});

localStorage.setItem("students", JSON.stringify(students));

alert("Student Added Successfully");

document.getElementById("name").value="";
document.getElementById("studentId").value="";
document.getElementById("sem").value="";

displayStudents();

}


// ---------------- DISPLAY STUDENTS ----------------

function displayStudents(){

let students = JSON.parse(localStorage.getItem("students")) || [];
let table = document.getElementById("studentTable");

if(!table) return;

table.innerHTML="";

students.forEach((s,index)=>{

let row = `
<tr>
<td>${s.name}</td>
<td>${s.id}</td>
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

localStorage.setItem("students",JSON.stringify(students));

displayStudents();

}


// ---------------- ADD MARKS ----------------

function addMarks(){

let name = document.getElementById("studentName").value;
let subject = document.getElementById("subject").value;
let marks = document.getElementById("marks").value;

if(name === "" || subject === "" || marks === ""){
    alert("Please fill all fields");
    return;
}

let markData = {
    name: name,
    subject: subject,
    marks: marks
};

let marksList = JSON.parse(localStorage.getItem("marks")) || [];

marksList.push(markData);

localStorage.setItem("marks", JSON.stringify(marksList));

alert("Marks Added Successfully");

document.getElementById("studentName").value="";
document.getElementById("subject").value="";
document.getElementById("marks").value="";

}


// ---------------- ADD NOTIFICATION ----------------

function sendNotification(){

let message = document.getElementById("notificationText").value;

if(message === ""){
alert("Enter notification message");
return;
}

let notes = JSON.parse(localStorage.getItem("notifications")) || [];

notes.push(message);

localStorage.setItem("notifications", JSON.stringify(notes));

alert("Notification sent successfully");

document.getElementById("notificationText").value="";

}


// ---------------- SHOW NOTIFICATIONS ----------------

async function sendNotification(){

let message = document.getElementById("notificationText").value;

if(message === ""){
alert("Enter notification message");
return;
}

await fetch("http://localhost:5000/api/notifications",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message:message})
});

alert("Notification sent successfully");

document.getElementById("notificationText").value="";

}