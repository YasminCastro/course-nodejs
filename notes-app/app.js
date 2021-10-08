const notes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");
const { string } = require("yargs");

//Mudando versão do yargs
yargs.version("1.1.0");

//criar comando add

yargs.command({
  command: "add",
  describe: "Adicionando uma nota nova",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Removendo nota",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNotes(argv.title);
  },
});

yargs.command({
  command: "read",
  describe: "Ler nota",
  hander: function () {
    console.log("Ler nota...");
  },
});

yargs.command({
  command: "list",
  describe: "Listando nota",
  hander: function () {
    console.log("Listando nota...");
  },
});

yargs.parse();
