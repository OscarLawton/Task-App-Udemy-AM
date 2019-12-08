const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

/* const Task = mongoose.model("Task", {
    description: { 
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}); */

/* const washingUp = new Task({
   description: "Cleaning windows",
   completed: false 
})

washingUp.save().then(() => {
    console.log("saved ", washingUp )
}).catch((err) => {
    console.log(err)
}) 
 */



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
 