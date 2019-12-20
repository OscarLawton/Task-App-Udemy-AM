const express = require('express');
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router();
const app = express()
app.use(router)

router.get('/tasks', async (req, res) => {
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

router.get('/tasks/:id', async (req, res) => {
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



router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid update!' })
    }
    
    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        if(!task){
            res.status(404).send();
        }
        res.send(task);
    } catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.post('/tasks', auth, async (req, res) =>{
    
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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



router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e){
        res.status(400).send(e)
    }
});

module.exports = router