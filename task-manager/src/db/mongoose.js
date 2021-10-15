const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//definindo um model
const user = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

//criando uma instancia
const me = new user({ name: "Yas", age: "25" });

//salvando a instancia no banco
me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Erro", error);
  });
