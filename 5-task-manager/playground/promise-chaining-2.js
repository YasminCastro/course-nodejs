require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndRemove("616d9e4201d8382aac9d6673")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount("616d9feb02842e13a0d425b7")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
