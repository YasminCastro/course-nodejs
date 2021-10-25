const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

//route to create a new task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//fetching all tasks
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });

    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

//fetching task by id
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    if (_id.length != 24) {
      res.status(404).send();
    }

    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//updating task by id
router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowUpdate = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowUpdate.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  if (_id.length != 24) {
    res.status(404).send();
  }

  try {
    const task = await Task.findById(req.params.id);

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//deleting tasks by id
router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  if (_id.length != 24) {
    res.status(404).send();
  }

  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
