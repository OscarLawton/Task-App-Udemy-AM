require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndUpdate("5dea85594e4d4006d15afc7d", {completed: false}).then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) =>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
}) 
/* 
const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed})
    return count
}

deleteTaskAndCount("5dead57677e8d313854c716d", false).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e)
}) */