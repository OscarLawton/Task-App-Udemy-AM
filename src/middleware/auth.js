const tkn = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    console.log("did this run?")
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        
        console.log(token)
        const decoded = tkn.verify(token, 'thisismynewcourse')
       
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if(!user){
            throw new Error()
        }
        console.log("************")
        console.log(user)
        console.log("************")
        req.token = token
        req.user = user
        next()
    } catch(e){
        console.log(e)
        res.status(401).send({error: "please authenticate, perfect"})
    }
    
} 

module.exports = auth