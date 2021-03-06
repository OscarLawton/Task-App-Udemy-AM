const express = require("express");
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined, true)
       /*  cb(new Error('File must be a PDF'))
        cb(undefined, true)
        cb(undefined, false) */
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})


/* app.use((req, res) => {
    res.status(503).send("site maintence")
}) */

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);



app.get("/", (req, res)=>{
    res.send("hey")
});

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

/* const jwt = require('jsonwebtoken')
const myFunction = async () =>{
    const token = jwt.sign({ _id: "abc123"}, 'thisismynewcourse', {expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction()  */
/* const bcrypt = require('bcrypt')
const myFunction = async () => {
    const password = 'Read12345!'
    const hashedPassword = await bcrypt.hash(password, 8);
    
    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log(isMatch)
}

myFunction() */

// toJSON() explaination

/* const Task = require('./models/task')
const User = require('./models/user')
const main = async () => {
    const task = await Task.findById('5dfc1e90bedadf25b303aada');
    await task.populate('owner').execPopulate()
    console.log(task)
    const user = await User.findById('5dfc1d5027df9124cc830b95')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main() */