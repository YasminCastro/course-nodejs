setTimeout(() => {
  console.log("Dois segundos se passaram...");
}, 2000);

const names = ["Yas", "Jess", "Andre"];
const shortNames = names.filter((name) => {
  return name.length <= 4;
});

const geocode = (adress, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    };

    callback(data);
  }, 2000);
};

geocode("Goias", (data) => {
  console.log(data);
});

const add = (x, y, callback) => {
  setTimeout(() => {
    callback(x + y);
  }, 2000);
};

add(1, 4, (sum) => {
  console.log(`O resultado da soma é ${sum}`); // Should print: 5
});
