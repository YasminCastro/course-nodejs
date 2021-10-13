const request = require("request");

const forecast = (latitude, longitude, callback) => {
  //puxar a location da cidade
  const url = `http://api.weatherstack.com/current?access_key=9d35a028587b06197804c8180334ab07&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    try {
      if (response.body.error) {
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
  });
};

module.exports = forecast;
