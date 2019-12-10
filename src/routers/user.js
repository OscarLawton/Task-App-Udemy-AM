const express = require('express');
const User = require('../models/user')
const router = new express.Router();
const app = express()
app.use(router)

router.get('/users', async (req, res) =>{
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
   
});

router.get('/users/:id', async (req, res) => {
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

router.post('/users', async (req, res) =>{
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

router.patch('/users/:id', async (req, res)=> {
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

router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).send()
        }
        res.status(200).send(user);
    } catch(e){
        res.status(400).send(e)
    }
})


module.exports = router