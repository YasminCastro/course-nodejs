const express = require("express");
const multer = require("multer");

const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

//route to create a new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//user logout by token
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//Logout of all sessions
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//allowing user to get their profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//fetch users by id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  if (_id.length != 24) {
    res.status(404).send();
  }

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

//route to update user infos by id
router.patch("/users/me", auth, async (req, res) => {
  //Se o usuario tentar alterar alguma informação que não existe ele irá receber um erro
  const updates = Object.keys(req.body);
  const allowUpdate = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowUpdate.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates." });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//deleting users by id
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.deleteOne({ _id: req.user._id });

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

//path to the image
const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/gm)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

//avatar upload
router.post(
  "/users/me/avatar",
  upload.single("avatar"),
  async (req, res) => {
    try {
      res.send();
    } catch (error) {
      res.status(500).send();
    }
  },
  (error, req, res, next) => {
    //function set up to caught errors
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
