// CRUD create read update delete


const {MongoClient, ObjectID } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017'; // "Localhost causes bubs and problems"
const databaseName = 'task-manger';

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
MongoClient.connect(connectionURL, {userNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Unable to conncect to database!');
    }

    console.log('Connected correctly!');

    const db = client.db(databaseName);

     db.collection('users').insertOne({
        _id: id,
        name: "Bobby",
        age: 16
    }), (err, result) => {
        if(err){
            return console.log('Unable to insret')
        }
    } 

   /*  db.collection('users').insertMany([{name: "john doe", age: 31, }, {name:"Jason", age: 66}], (err, result) => {
        if(err){
            return console.log("unage to insert data!")
        }
        console.log("yeah it was added;")
    }) */

    /* db.collection('tasks').insertMany([{des: "Clean the house", completed: true}, {des: "take out the trash", completed: false }, {des: "do shopping", completed: false}], (err, result)=> {
        if(err){
            return console.log("could not insert data")
        }
        
        console.log("data added to database")
    }) */
});