
const express = require('express');

const cors = require('cors');

const taskRouter = require('./routes/taskRouter');

const userRouter = require('./routes/userRouter');

const designationRouter = require('./routes/designationRouter');

const projectRouter =  require('./routes/projectRouter');

const PORT = 8000;

const app = express();

// app.use(cors());

app.use( express.json() );

// app.use( taskRouter );

// app.use( userRouter );

// app.use( designationRouter );

console.log("Rewuest");

app.use( projectRouter );

app.listen(PORT, ()=> console.log(`Server Listening at ${PORT}`))