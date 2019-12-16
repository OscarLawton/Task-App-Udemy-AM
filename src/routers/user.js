const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router();
const app = express()
app.use(router)

router.get('/users/me', auth, async (req, res) =>{
    console.log(req.user)
    res.send(req.user)
   
});

router.get('/users', auth, async (req, res) => {
    const users = await User.find({});
    res.send(users)
})

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
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
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

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        
        res.send({ user, token })
    } catch(e){
        res.status(400).send(e)
        console.log(e)
    }

})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        console.log(req.user)
        await req.user.save()
        res.send()
    } catch(e){
        console.log('***********')
        console.log(e)
        console.log('***********')
        res.status(500).send(e)
    }
});

router.post('/users/logout-all', auth, async (req, res) => {
    try{
        req.user.tokens = []
        console.log(req.user)
        await req.user.save()        
        console.log(req.user)
        res.status(200).send('it worked')
    } catch(e){
        console.log(e)
        res.status(500).send()
    }
});

router.patch('/users/:id', async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid update!' });
    }
    
    try{
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).send();
        }
        res.status(200).send(user);
    } catch(e){
        res.status(400).send(e);
    }
});


module.exports = router;