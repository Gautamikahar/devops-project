const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

let users = [];

// Register
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  users.push({ username, password });
  res.send("User registered successfully");
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  res.send("Login successful");
});

app.listen(3002, () => {
  console.log("User service running on port 3002");
});
