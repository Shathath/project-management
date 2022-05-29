
const express = require('express');

const PORT = 8000;

const app = express();

app.use( express.json() );

app.get('/', (req, res) => 
{
	res.send( { name : 'rahman'})
})

app.post('/createtask', (req,res)=>
{
	const { task_name, description, assigned_to, duedate, priority } = req.body;

	db.query(
 		
		"INSERT INTO Tasks( task_name, description, assigned_to, duedate, priority) VALUES($1,$2,$3,$4,$5) RETURNING *",[task_name, description, assigned_to, duedate, priority],
		
		function(err, resp) 
		{	
			res.send( resp )
	  		
			db.end();
		}
	)
})

app.listen(PORT, ()=> console.log(`Server listenug`))