const express = require("express");
const app = express();
app.use(express.json());

let issues = [];
let id = 1;

app.post("/issue", (req, res) => {
  const issue = { id: id++, ...req.body, status: "pending" };
  issues.push(issue);
  res.send(issue);
});

app.get("/issues", (req, res) => {
  res.json(issues);
});

app.listen(3001, () => {
  console.log("Issue service running on port 3001");
});
