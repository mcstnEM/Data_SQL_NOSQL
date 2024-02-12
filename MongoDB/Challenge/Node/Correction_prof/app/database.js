// Connexion persistente à la base MongoDB
const MongoClient = require("mongodb").MongoClient;

// Déclaration de la connectionString
const CONNECTION_STRING = "mongodb://root:example@mongo:27017"; // Avec Docker
// const CONNECTION_STRING = 'mongodb://localhost:27017'; // Installation locale de MongoDB

// Initialise une connexion à la base MongoDB
const client = new MongoClient(CONNECTION_STRING);

let db = null;

exports.open = function openDatabase(dbName) {
  return client.connect().then(() => {
    console.log('Connection to MongoDB initialized …');
    db = client.db(dbName);
  });
};

// Fonction permettant d'obtenir un object 'collection' Mongo
exports.getCollection = function getCollection(collectionName) {
  console.log(`Retrieving collection ${collectionName} …`);
  return db.collection(collectionName);
};
