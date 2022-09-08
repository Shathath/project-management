
const express = require('express');

const cors = require('cors');

require('dotenv').config();

//const session = require("express-session");

//const RedisStore = require("connect-redis")(session);

//const redisClient = require("./helpers/redis")

const taskRouter = require('./routes/taskRouter');

const userRouter = require('./routes/userRouter');

const designationRouter = require('./routes/designationRouter');

const projectRouter =  require('./routes/projectRouter');


const PORT = 8000;

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));

// const config = 
// {
// 	CLIENT_ID : process.env.CLIENT_ID,
	
// 	CLIENT_SECRET : process.env.CLIENT_SECRET
// }

// app.use( session({
// 	store: new RedisStore({ client: redisClient }),
//     saveUninitialized: false,
//     secret: "keyboard cat",
//     resave: false,
// }))

app.use( express.json() );

app.use( taskRouter );

app.use( userRouter );

app.use( designationRouter );

app.use( projectRouter );

app.listen(PORT, ()=> console.log(`Server Listening at ${PORT}`));