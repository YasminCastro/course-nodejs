const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/gm)) {
      return cb(new Error("Please upload a word document"));
    }

    cb(undefined, true);
  },
});

//accept docs and deal with error
app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    //function set up to caught errors
    res.status(400).send({ error: error.message });
  }
);

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);

app.listen(port);

//Middleware for maintence mode
// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon");
// });
