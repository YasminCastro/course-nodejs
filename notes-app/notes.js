const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Your notes...";

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => note.title === title);
  /* const duplicateNotes = notes.filter(function (note){
      return note.title===title
  }) */

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("Nota adicionada"));
  } else {
    console.log(chalk.red("O titulo da nota já existe"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title != title);
  saveNotes(notesToKeep);

  /* const notesToKeep = notes.filter(function (note){
      return note.title !== title
  })
  */

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Nota removida"));
  } else {
    console.log(chalk.red.inverse("Nota não encontrada"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  for (var i = 0; i < notes.length; i++) {
    console.log(notes[i].title);
  }

  /* notes.forEach((notes) =>{
      console.log(notes.title)
  })
  */
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNotes: removeNotes,
  listNotes: listNotes,
};
