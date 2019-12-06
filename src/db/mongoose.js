const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

/* const Task = mongoose.model("Task", {
    name: { 
        type: String
    },
    completed: {
        type: Boolean
    }
});

const washingUp = new Task({
   name: "Hoovering",
   completed: false 
})

washingUp.save().then(() => {
    console.log("saved ", washingUp )
}).catch((err) => {
    console.log(err)
}) */
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
    }
});

const me = new User({
    name: "    Andy",
    email: "andy@google.com",
    
    
});

me.save().then(() => {
    console.log('saved', me)
}).catch((err) => {
  console.log("error!", err)  
})
 