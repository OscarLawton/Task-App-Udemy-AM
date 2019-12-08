const express = require("express");
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', (req, res) =>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((err) => {
        res.status(500).send();
    })
});

app.get('/users/:id', (req, res) => {
    console.log(req.params)
    User.findOne({_id: req.params.id}).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user);
        console.log(user)
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((err) => {
        res.send(err);
    })
})

app.get('/tasks/:id', (req, res) => {
    Task.findOne({_id: req.params.id}).then((task)=>{
        res.send(task);
    }).catch((err) => {
        res.send(err);
    })
})

app.post('/users', (req, res) =>{
    console.log("did this run")
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.status(400).send(err);
    })
});

app.post('/tasks', (req, res) =>{
    console.log("did this run?")
    const task = new Task(req.body);
    task.save().then(() => {
        res.send(task);
    }).catch((err)=>{
        res.status(400).send(err);
    })
});

app.get("/", (req, res)=>{
    res.send("hey")
});

app.listen(port, () => {
    console.log("Server is up on port " + port)
})