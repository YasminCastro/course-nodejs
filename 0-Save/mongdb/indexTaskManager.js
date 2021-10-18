const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//route to create a new user
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});

//fetch multiple users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }

  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

//fetch users by id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }

  // if (_id.length != 24) {
  //   return res.status(404).send();
  // }

  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }

  //     res.send(user);
  //   })
  //   .catch((e) => {
  //     res.status(500).send(e);
  //   });
});

//route to create a new task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }

  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});

//fetching all tasks
app.get("/tasks", async (req, res) => {
  try {
    Task.find({});
    res.send();
  } catch (error) {
    res.status(500).send();
  }

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
