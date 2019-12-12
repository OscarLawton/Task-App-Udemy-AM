const express = require("express");
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')
const app = express();
const port = process.env.PORT || 3000


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
    const token = jwt.sign({ _id: "abc123"}, 'thisismynewcourse', {expiresIn: ' seconds'})
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction() */
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