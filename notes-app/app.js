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
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
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
  handler(argv) {
    notes.removeNotes(argv.title);
  },
});

yargs.command({
  command: "read",
  describe: "Ler nota",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNotes(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "Listando nota",
  handler() {
    console.log(chalk.white.inverse("Listando nota..."));
    notes.listNotes();
  },
});

yargs.parse();
