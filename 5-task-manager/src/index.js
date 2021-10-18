const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//route to create a new user
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//fetch multiple users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

//fetch users by id
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  if (_id.length != 24) {
    return res.status(404).send();
  }

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

//route to create a new task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//fetching all tasks
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

//fetching task by id
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  if (_id.length != 24) {
    res.status(404).send();
  }

  Task.findById(_id)
    .then((task) => {
      if (!task) {
        res.status(404).send();
      }

      res.send(task);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.listen(port);
