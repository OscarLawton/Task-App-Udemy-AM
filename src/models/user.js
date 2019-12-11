const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalid");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a postive number');
            }
        }
    },
    phoneNumber: {
        type: String,
        default: "Nan"
    },
    password: {
        type: String,
        validate(value){
          
            if(value.length < 7){
             
                throw new Error("Password must be longer than 7 characters.")
            }
            if(validator.contains(value,"password")){
                throw new Error("Password can not contain \"password\"")
                //console.log("or this?")
            }
        },
        trim: true,
        required: true
    }
})

userSchema.pre('save', async function(next){
    const user = this 

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log('just before saving!')
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User