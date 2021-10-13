const request = require("request");

const forecast = (latitude, longitude, callback) => {
  //puxar a location da cidade
  const url = `http://api.weatherstack.com/current?access_key=9d35a028587b06197804c8180334ab07&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    try {
      if (body.error) {
        callback("Unable to find location", undefined);
      }

      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        weatherDescription: body.current.weather_descriptions[0],
      });
    } catch (error) {
      callback("Unable to connect to weather service!", undefined);
    }
  });
};

module.exports = forecast;
