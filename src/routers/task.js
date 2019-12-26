const express = require('express');
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router();
const app = express()
app.use(router)


// GET /tasks?complete=false
// GET /tasks?limit=10&skip=0
// Get /tasks/?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ?  -1 : 1
    }
    try{
        // New way (populate)
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
        // Old way
        /* const tasks = await Task.find({owner: req.user._id })
        if(!tasks){
            return res.status(500).send()
        }
        res.send(tasks) */
    } catch(e){
        res.status(500).send()
    }
   /*  Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((err) => {
        res.send(err);
    }) */
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        const task = await Task.findOne({ _id, owner: req.user._id })
       
        if(!task){
            console.log("no task found")
            return res.status(404).send()
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



router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid update!' })
    }
    
    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
       
       
        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        if(!task){
            res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
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



router.delete('/tasks/:id',auth, async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id });
        if(!task){
            res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e){
        res.status(400).send(e)
    }
});

module.exports = router