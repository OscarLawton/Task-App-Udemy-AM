require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete("5deb10edc9745d20195ddc5f").then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) =>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})