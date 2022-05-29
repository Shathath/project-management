const { db } = require('../model/db');

var createTask = function(req,res)
{
	const { task_name, description, assigned_to, duedate, priority } = req.body;

	db.query(
 		
		"INSERT INTO Tasks( task_name, description, assigned_to, duedate, priority) VALUES($1,$2,$3,$4,$5) RETURNING *",[task_name, description, assigned_to, duedate, priority],
		
		function(err, dbResponse) 
		{	
			res.status(201).json( { data : dbResponse.rows } )
	  		
			db.end();
		}
	)
}

var getTask = function(req,res)
{
	var { id } = req.params;

	db.query(`SELECT * FROM Tasks where task_id=${id} `, function(error,dbresponse)
	{
		res.status(200).json( dbresponse )
		
		db.end();
	})
}

var getAllTasks = function( req, res ) 
{
	db.query('SELECT * FROM Tasks', function( req, dbresponse )
	{
		res.status(200).json( dbresponse )

		db.end();
	})
}

module.exports = 
{
	createTask,
	getTask,
	getAllTasks
}