const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const Task = mongoose.model("Task", {
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
})
/* const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const me = new User({
    name: "Emmet",
    age: 31
});

me.save().then(() => {
    console.log('saved', me)
}).catch((err) => {
  console.log("error!", err)  
})
 */