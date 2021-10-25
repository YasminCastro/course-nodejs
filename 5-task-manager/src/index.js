const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

//Middleware for maintence mode
// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon");
// });

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);

app.listen(port);

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   //   const task = await Task.findById("6176c5b232d2350a4067a2de");
//   //   await task.populate("owner").execPopulate();
//   //   console.log(task.owner);
//   const user = await User.findById("6176c471939bf60b44d218c5");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
