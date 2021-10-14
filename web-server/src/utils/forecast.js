const request = require("request");

const forecast = (latitude, longitude, callback) => {
  //puxar a location da cidade
  const url = `http://api.weatherstack.com/current?access_key=9d35a028587b06197804c8180334ab07&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,

        " It is currently " +
          body.current.temperature +
          " degress out. I feels like" +
          body.current.feelslike +
          "and the weather description is " +
          body.current.weather_descriptions[0]
      );
    }
  });
};

module.exports = forecast;
