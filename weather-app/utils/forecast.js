const request = require("request");

const forecast = (location, callback) => {
  //puxar a location da cidade
  const url = `http://api.weatherstack.com/current?access_key=9d35a028587b06197804c8180334ab07&query=37.8267,-122.4233`;

  try {
    if (Response.body.error) {
      callback("Unable to find location", undefined);
    }

    callback(undefined, {
      temperature: response.body.current.temperature,
      feelslike: response.body.current.feelslike,
      weatherDescription: response.body.current.weather_descriptions[0],
    });
  } catch (error) {
    callback("Unable to connect to weather service!", undefined);
  }
};

//
// Goal: Create a reusable function for getting the forecast
//
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

module.exports = forecast;
