const users = [];

const addUser = ({ id, username, room }) => {
  //clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate data
  if (!username || !room) {
    return {
      error: "Username and Room are required.",
    };
  }

  //check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //validate username

  if (existingUser) {
    return {
      error: "Username is in use.",
    };
  }

  //store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

addUser({
  id: 11,
  username: "Yas",
  room: "Central",
});

console.log(users);

const res = addUser({
  id: 12,
  username: "Yas",
  room: "Central",
});

console.log(res);

module.exports = { addUser };
