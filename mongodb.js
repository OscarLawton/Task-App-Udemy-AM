// CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'; // "Localhost causes bubs and problems"
const databaseName = 'task-manger';

MongoClient.connect(connectionURL, {userNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Unable to conncect to database!');
    }

    console.log('Connected correctly!');
});