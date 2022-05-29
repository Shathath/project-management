
const express = require('express');

const taskRouter = require('./routes/taskRouter');

const userRouter = require('./routes/userRouter');

const designationRouter = require('./routes/designationRouter');

const PORT = 8000;

const app = express();

app.use( express.json() );

app.use( taskRouter );

app.use( userRouter );

app.use( designationRouter );

app.listen(PORT, ()=> console.log(`Server Listening at ${PORT}`))