const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicPath));

//setup dinamic directory to serve
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
    name: "Yas",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is sunny",
    location: "Goiânia",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Yas",
    title: "Help",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Yas",
    errorMessage: "Page not found",
    title: "404",
  });
});

app.listen(3000);
