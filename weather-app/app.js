const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const location = process.argv[2];

if (location) {
  geocode(location, (error, data) => {
    try {
      forecast(data.latitude, data.longitude, (error, forecastData) => {
        try {
          console.log("Em " + data.location);
          console.log(
            `A temperatura é de ${forecastData.temperature}°c, com sensação térmica de ${forecastData.feelslike}°c e o dia será ${forecastData.weatherDescription}`
          );
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
} else {
  console.log("Por favor insira uma localização");
}
