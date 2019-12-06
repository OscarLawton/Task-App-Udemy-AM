const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const Task = mongoose.model("Task", {
    description: { 
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const washingUp = new Task({
   description: "Cleaning windows",
   completed: false 
})

washingUp.save().then(() => {
    console.log("saved ", washingUp )
}).catch((err) => {
    console.log(err)
}) 


const User = mongoose.model('User', {
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
            console.log("DId it print before∂")
            if(value.length < 7){
                console.log("did this print")
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
});

 /* const me = new User({
    name: " Barbara",
    email: "barb@google.com",
    password: "   Iam!Sexy!!!   "
    
});
 
me.save().then(() => {
    console.log('saved', me)
}).catch((err) => {
  console.log("error!", err)  
}) */
 