const express = require("express");
const app = express();

app.use(express.json());

//Simple Data
let students = [
  { id: 1, name: "Madhavi", course: "MERN", city: "Kolkata", fees: 50000 },
  { id: 2, name: "Rahul", course: "Java", city: "Delhi", fees: 40000 },
  { id: 3, name: "Priya", course: "Python", city: "Mumbai", fees: 45000 }
];

//Qs1. Welcome Message
app.get("/", (req, res) => {
  res.send("Welcome to Student Management API");
});

//Qs2. Fetch All Students
  app.get("/students", (req, res) => {
  res.json(students);
});

//Qs3. Fetch Students by ID

app.get("/students/:id", (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  res.json(student);
});

//Qs4. Add New Students

app.post("/students", (req, res) => {
  students.push(req.body);
  res.json({
    message: "Student Added",
    students
  });
});

//Qs5. Delete Student by ID
app.delete("/students/:id", (req, res) => {
  students = students.filter(
    s => s.id !== Number(req.params.id)
  );

  res.json({
    message: "Student Deleted"
  });
});

//Qs6. Update Student
app.put("/students/:id", (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (student) {
    Object.assign(student, req.body);
    res.json(student);
  } else {
    res.send("Student Not Found");
  }
});

//Qs7.Search by Name
app.get("/search/name/:name", (req, res) => {
  const result = students.filter(
    s => s.name.toLowerCase().includes(req.params.name.toLowerCase())
  );

  res.json(result);
});

//Qs8. Search by Coures
app.get("/search/course/:course", (req, res) => {
  const result = students.filter(
    s => s.course.toLowerCase() === req.params.course.toLowerCase()
  );

  res.json(result);
});

//Qs9. Filter by City
app.get("/search/city/:city", (req, res) => {
  const result = students.filter(
    s => s.city.toLowerCase() === req.params.city.toLowerCase()
  );

  res.json(result);
});

//Qs10. Count Students
app.get("/count", (req, res) => {
  res.json({
    totalStudents: students.length
  });
});

//Qs11. Fees Greater then Amount
app.get("/fees/greater/:amount", (req, res) => {
  const result = students.filter(
    s => s.fees > Number(req.params.amount)
  );

  res.json(result);
});

//Qs12. Fees Less then Amount
app.get("/fees/less/:amount", (req, res) => {
  const result = students.filter(
    s => s.fees < Number(req.params.amount)
  );

  res.json(result);
});

//Qs13. Sort by Name
app.get("/sort/name", (req, res) => {
  const result = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  res.json(result);
});

//Qs14. Sort Fees Low to High
app.get("/sort/fees/asc", (req, res) => {
  const result = [...students].sort(
    (a, b) => a.fees - b.fees
  );

  res.json(result);
});

//Qs15. Sort Fees high to low
app.get("/sort/fees/desc", (req, res) => {
  const result = [...students].sort(
    (a, b) => b.fees - a.fees
  );

  res.json(result);
});

//Qs16. Check Student Exists
app.get("/exists/:id", (req, res) => {
  const exists = students.some(
    s => s.id === Number(req.params.id)
  );

  res.json({
    exists
  });
});

//Qs17. Total Fees Collected
app.get("/total-fees", (req, res) => {
  const total = students.reduce(
    (sum, student) => sum + student.fees,
    0
  );

  res.json({
    totalFees: total
  });
});

//Qs18. Coures Wise Students
app.get("/course-report", (req, res) => {
  const report = {};

  students.forEach(student => {
    if (!report[student.course]) {
      report[student.course] = [];
    }

    report[student.course].push(student);
  });

  res.json(report);
});

//Qs19. Add Multiple Students
app.post("/students/bulk", (req, res) => {
  students.push(...req.body);

  res.json({
    message: "Students Added Successfully",
    students
  });
});

[
  {
    "id": 4,
    "name": "Amit",
    "course": "NodeJS",
    "city": "Pune",
    "fees": 35000
  },
  {
    "id": 5,
    "name": "Neha",
    "course": "MERN",
    "city": "Kolkata",
    "fees": 55000
  }
]

//Qs20. Student Dashboard Report
app.get("/dashboard", (req, res) => {
  const totalStudents = students.length;

  const totalFees = students.reduce(
    (sum, s) => sum + s.fees,
    0
  );

  const courses = [...new Set(
    students.map(s => s.course)
  )];

  res.json({
    totalStudents,
    totalFees,
    totalCourses: courses.length,
    courses
  });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});