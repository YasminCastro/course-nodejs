const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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
    title: "Home",
    name: " Yas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: " Yas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: " ",
    name: " Yas",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        try {
          res.send({
            forecast: `A temperatura é de ${forecastData.temperature}°c, com sensação térmica de ${forecastData.feelslike}°c e o dia será ${forecastData.weatherDescription}`,
            location,
            address: req.query.address,
          });
        } catch (error) {
          return res.send({ error });
        }
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: " Yas",
    title: "Help",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: " Yas",
    errorMessage: "Page not found",
    title: "404",
  });
});

app.listen(3000);
