
const express = require('express');

require('dotenv').config( { path : "./config.env"});


const cors = require('cors');


const taskRouter = require('./routes/taskRouter');

const userRouter = require('./routes/userRouter');

const designationRouter = require('./routes/designationRouter');

const projectRouter =  require('./routes/projectRouter');

const moduleRouter = require('./routes/moduleRouter')

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));

app.use( express.json() );

app.use('/v1/tasks' , taskRouter );

app.use('/v1/users', userRouter );

app.use('/v1/designations', designationRouter );

app.use('/v1/projects', projectRouter );

app.use('/v1/modules', moduleRouter);

app.listen(PORT, ()=> console.log(`Server Listening at ${PORT}`));