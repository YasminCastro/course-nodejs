//maneira de escrever funçãoo arrow

// const square = function (x) {
//   return x * x;
// };

// const square = (x) => {
//   return x * x;
// };

// const square = (x) => x * x;

const event = {
  name: "Birthday Party ",
  guestList: ["Andre", "Maycon", "Amanda"],
  printGuestList() {
    console.log("Guest list for " + this.name);

    this.guestList.forEach((guest) => {
      console.log(guest + " irá para " + this.name);
    });
  },
};

event.printGuestList();
