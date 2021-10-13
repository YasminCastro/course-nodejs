const path = require("path");
const express = require("express");
const app = express();

//Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Yas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Texto de ajuda",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is sunny",
    location: "Goiânia",
  });
});

app.listen(3000);
