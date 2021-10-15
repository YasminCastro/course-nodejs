//CRUD - Create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId, db } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database.");
    }

    const db = client.db(databaseName);

    //CREATE
    //------------------------Adicionando 1 informação na collection-------------------------------------------
    //("Nome da table")
    //insertOne para inserir apenas um
    db.collection("users").insertOne(
      {
        name: "Yas",
        age: 21,
      },
      (error, result) => {
        //error handler
        if (error) {
          return console.log("Unable to insert user");
        }
        //console para saber se foi inserido nos documentos
        console.log(result.acknowledged);
      }
    );
    //----------------------------Adicionando mais de 1 informação na collection--------------------------------
    db.collection("users").insertMany(
      [
        {
          name: "jen",
          age: 35,
        },
        {
          name: "gunther",
          age: 23,
        },
      ], //error handler
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents.");
        }

        console.log(result.insertedIds);
      }
    );

    //READ
    //----------------------------------------------Lendo 1 informação na collection----------------------------------
    db.collection("users").findOne(
      { _id: new ObjectId("616990b2d4a158d90fb230d3") },
      (error, user) => {
        if (error) {
          console.log("Unable to fetch");
        }

        console.log(user);
      }
    );

    //-------------------------------Lendo varias informações na collection trasnformando em um array---------------------
    db.collection("users")
      .find({ age: 23 })
      .toArray((error, users) => {
        console.log(users);
      });
    // Para contar quantas informações pode usar .count em vez de .toaArray. Tem mais propriedades na documentação

    //UPDATE
    //------------------------------------------Atualizando uma informação do objeto da collection---------------------------

    db.collection("users")
      .updateOne(
        { _id: new ObjectId("61698745ba464608244da3aa") },
        {
          $inc: {
            age: 1,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //--------------------------------------------Atualizando informações de varios objetos da collection -----------------------

    db.collection("tasks")
      .updateMany(
        {
          completed: false,
        },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //DELETING
    //-----------------------------------------------Deletando informações-------------------------------------------

    db.collection("users")
      .deleteMany({
        age: 23,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //-----------------------------------Deletando uma info-------------------------------------

    db.collection("tasks")
      .deleteOne({
        description: "Lavar louça",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
