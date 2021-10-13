const path = require("path");
const express = require("express");
const app = express();

const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

app.get("/help", (req, res) => {
  res.send("Help page");
});

app.get("/about", (req, res) => {
  res.send("<h1>About me</h1>");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is sunny",
    location: "Goiânia",
  });
});

app.listen(3000);
