// const express = require("express");
// const app = express();
// app.use(express.json());

// let issues = [
//   { id: 1, title: "Pothole", status: "pending" },
//   { id: 2, title: "Garbage", status: "pending" },
// ];

// // Update issue status
// app.put("/issue/:id/status", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { status } = req.body;

//   const issue = issues.find((i) => i.id === id);

//   if (!issue) {
//     return res.status(404).send("Issue not found");
//   }

//   issue.status = status;
//   res.send("Issue status updated");
// });

// // View all issues (optional but useful)
// app.get("/issues", (req, res) => {
//   res.json(issues);
// });

// app.listen(3003, () => {
//   console.log("Admin service running on port 3003");
// });

const express = require("express");
const app = express();

app.use(express.json());

// Sample issues data
let issues = [
  { id: 1, title: "Pothole", status: "pending" },
  { id: 2, title: "Garbage", status: "pending" },
];

// ✅ Update issue status
app.put("/issue/:id/status", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const issue = issues.find((i) => i.id === id);

  if (!issue) {
    return res.status(404).send("Issue not found");
  }

  issue.status = status;
  res.send("Issue status updated");
});

// ✅ Get all issues
app.get("/issues", (req, res) => {
  res.json(issues);
});

// ✅ IMPORTANT: Use dynamic port for Render
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Admin service running on port ${PORT}`);
});