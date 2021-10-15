const fs = require("fs");
// const book = {
//   title: "ego is the enemy",
//   author: "ryan",
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJSON);

// const parsedData = JSON.parse(bookJSON);
// console.log(parsedData.author);

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

//parsing data
const dataBuffer = fs.readFileSync("1-json.json");
const dataJSON = dataBuffer.toString(); //convertendo para uma string
const data = JSON.parse(dataJSON); //parsing para objeto
console.log(data.name);

//mudando informações
data.name = "Yas";
data.age = "21";

const userJSON = JSON.stringify(data); //convertendo o valor em JS para uma string
fs.writeFileSync("1-json.json", userJSON); //sobrescrevendo informações trocadas

console.log(data.name);
