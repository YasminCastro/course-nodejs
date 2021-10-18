require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndRemove("616d9e4201d8382aac9d6673")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
