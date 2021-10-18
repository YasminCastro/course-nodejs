require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("616d9e5f01d8382aac9d6675", { age: 30 })
//   .then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 30 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("616d9e5f01d8382aac9d6675", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
