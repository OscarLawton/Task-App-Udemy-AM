// CRUD create read update delete


const {MongoClient, ObjectID } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017'; // "Localhost causes bubs and problems"
const databaseName = 'task-manger';

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
MongoClient.connect(connectionURL, {userNewUrlParser: true}, (err, client) => {
   if(err){
       return console.log('Unable to connect to database!')
   } 

    const db = client.db(databaseName);

    db.collection('users').findOne({ name: 'Bobby'}, (err, user) => {
        if(err){
            return console.log("unable get user")
        }

        console.log(user);
    })
});