const request = require("request");
const geocode = require("./utils/geocode");
// const url =
//   "http://api.weatherstack.com/current?access_key=9d35a028587b06197804c8180334ab07&query=37.8267,-122.4233";
// const geocodingURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoieWFzbWluc2RjYXN0cm8iLCJhIjoiY2t1bXdhYWtmM3dzNjJvbzgzZjFiMm1hYyJ9.blHdo46KvuoiZE0VhIBzoA&limit=1";

// request({ url: url, json: true }, (error, response) => {
//   //console.log(response.body.current);
//   try {
//     if (response.body.error) {
//       console.log("Unable to find location");
//       return;
//     }
//     const temperature = response.body.current.temperature;
//     const feelslike = response.body.current.feelslike;
//     const weatherDescription = response.body.current.weather_descriptions[0];
//     const weatherDescpLower = weatherDescription.toLowerCase();

//     console.log(
//       `The weather is ${weatherDescpLower}, it is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
//     );
//   } catch (error) {
//     console.log("Unable to connect to weather service!");
//   }
// });

// request({ url: geocodingURL, json: true }, (error, response) => {
//   try {
//     if (response.body.features.length === 0) {
//       console.log("Unable to find location, try another search");
//       return;
//     }

//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];

//     console.log(latitude, longitude);
//   } catch (error) {
//     console.log("Unable to connect to location service!");
//   }
// });

geocode("boston", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
