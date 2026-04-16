const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

let userIssues = {}; 
let issues = [];
let id = 1;

// app.post("/issue", (req, res) => {
//   const issue = { id: id++, ...req.body, status: "pending" };
//   issues.push(issue);
//   res.send(issue);
// });

app.post("/issue", (req, res) => {
  const { title, username } = req.body;

  const issue = {
    id: Date.now(),
    title,
    status: "pending",
    username
  };

  if (!userIssues[username]) {
    userIssues[username] = [];
  }

  userIssues[username].push(issue);

  res.json(issue);
});

// app.get("/issues", (req, res) => {
//   res.json(issues);
// });

app.get("/user/:username/issues", (req, res) => {
  const username = req.params.username;
  res.json(userIssues[username] || []);
});

app.listen(3001, () => {
  console.log("Issue service running on port 3001");
});
