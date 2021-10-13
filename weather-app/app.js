const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const location = process.argv[2];

if (location) {
  geocode(location, (error, { longitude, latitude, location } = {}) => {
    try {
      forecast(
        latitude,
        longitude,
        (error, { temperature, feelslike, weatherDescription }) => {
          try {
            console.log("Em " + location);
            console.log(
              `A temperatura é de ${temperature}°c, com sensação térmica de ${feelslike}°c e o dia será ${weatherDescription}`
            );
          } catch (error) {
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
} else {
  console.log("Por favor insira uma localização");
}
