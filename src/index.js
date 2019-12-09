const express = require("express");
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', async (req, res) =>{
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
   
});

app.get('/users/:id', async (req, res) => {
    console.log(req.params)
    const _id = req.params.id

    try{
        const user = await User.findOne({_id})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
   /*  User.findOne({_id: req.params.id}).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user);
        console.log(user)
    }).catch((err) =>{
        res.status(500).send(err)
    }) */
})

app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        if(!tasks){
            return res.status(500).send()
        }
        res.send(tasks)
    } catch(e){
        res.status(500).send()
    }
   /*  Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((err) => {
        res.send(err);
    }) */
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try{
        
        const task = await Task.findOne({_id})
        if(!task){
            console.log("no task found")
            return res.status(500).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
   /*  Task.findOne({_id: req.params.id}).then((task)=>{
        res.send(task);
    }).catch((err) => {
        res.send(err);
    }) */
})

app.post('/users', async (req, res) =>{
    const user = new User(req.body);
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e);
        console.log(e)
    }
    
    /* user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.status(400).send(err);
    }) */
});

app.patch('/users/:id', async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid update!' })
    }
    const _id = req.params.id
    try{
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

app.post('/tasks', async (req, res) =>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }

   /*  const task = new Task(req.body);
    task.save().then(() => {
        res.send(task);
    }).catch((err)=>{
        res.status(400).send(err);
    }) */
});

app.get("/", (req, res)=>{
    res.send("hey")
});

app.listen(port, () => {
    console.log("Server is up on port " + port)
})