const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let users = [];

// /api/users
app.post("/api/users", (req, res) => {
  const username = req.body.username;
  const _id = Date.now().toString();

  users.push({
    username: username,
    _id: _id,
    log: []
  });

  res.json({
    username: username,
    _id: _id
  });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

// /api/users/:_id/exercises
app.post("/api/users/:_id/exercises", (req, res) => {
  const _id = req.params._id;
  const user = users.find((u) => u._id === _id);
  const { date: dateParam, duration, description } = req.body;
  const date = dateParam ? new Date(dateParam) : new Date();

  if (!user) {
    return res.json({ error: "User not found" })
  }

  user.log.push({
    date: date.toDateString(),
    duration: Number(duration),
    description: description
  });

  res.json({
    _id: _id,
    username: user.username,
    date: date.toDateString(),
    duration: Number(duration),
    description: description
  });
});

// /api/users/:_id/logs
app.get("/api/users/:_id/logs",(req, res) => {
  const _id = req.params._id;
  const user = users.find((u) => u._id === _id);
  const { from, to, limit } = req.query;

  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  let filteredLog = user.log.filter(ex => {
    const exDate = new Date(ex.date);

    if (from && exDate < new Date(from)) 
      return false;
    if (to && exDate > new Date(to)) 
      return false;
    
    return true;
  });

  if (limit) {
    filteredLog = filteredLog.slice(0, Number(limit));
  }

  res.json({
    _id: user._id,
    username: user.username,
    count: filteredLog.length,
    log: filteredLog
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
