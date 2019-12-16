// CRUD create read update delete


/* const {MongoClient, ObjectID } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017'; // "Localhost causes bubs and problems"
const databaseName = 'task-manger';
 */
/* const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp()) */
/* MongoClient.connect(connectionURL, {userNewUrlParser: true}, (err, client) => {
   if(err){
       return console.log('Unable to connect to database!')
   }  

    const db = client.db(databaseName);
*/
    /*db.collection('users').deleteMany({
        age: 22
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/
   /*  db.collection('tasks').deleteOne({
        des: "do shopping"
    }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    }) */
    //db.collection('users').insert({name: "shitty", age: 22})
    /* const updatePromise = db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        
        }

    })

    updatePromise.then((result)=>{
        console.log(result)
    }).catch((err) => {
        console.log(err)
    }) */
   /*  db.collection('users').findOne({ _id: new ObjectID("5de44b5bf3a7e3a03d3ba762")}, (err, user) => {
        if(err){
            return console.log("unable get user")
        }

        console.log(user);
    }) */

    /* db.collection('users').find({ age: 16 }).toArray((err, users) => {
        console.log(users)
    }) */

   /*  db.collection('tasks').findOne({des: "do shopping"}, (err, task) => {
        if(err){
            return console.log(err);
        }
        
        console.log(task);
    })

    db.collection('tasks').find({completed: false}).toArray((err, tasks) => {
        if(err){
            return console.log(err)
        }
        
        console.log(tasks)
    }) */
//});

