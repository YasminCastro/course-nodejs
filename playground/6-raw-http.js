const http = require("http");

const url = `http://api.weatherstack.com/current?access_key=9d35a028587b06197804c8180334ab07&query=45,-75`;

const request = http.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("Um erro", error);
});
request.end();
