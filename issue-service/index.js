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

app.put("/issue/:id/status", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  for (let user in userIssues) {
    const issue = userIssues[user].find(i => i.id == id);

    if (issue) {
      issue.status = status;
      return res.send("Issue status updated");
    }
  }

  res.status(404).send("Issue not found");
});
