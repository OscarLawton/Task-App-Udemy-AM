const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
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

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    
    delete userObject.password;
    delete userObject.tokens;

    return userObject ;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');

    user.tokens = user.tokens.concat({ token });
    await user.save()
    return token 
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error("Unable to login!*!")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login!**!")
    }

    return user
}

// Hash the plain text password before saving
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