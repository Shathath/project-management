const { db } = require('../model/db');

var createTask = function(req,res)
{
	const { task_name, description, assigned_to, duedate, priority, created_by, project_id } = req.body;

	db.query(
 		
		"insert into tasks( task_name, description, assigned_to, duedate, priority, created_by, project_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[task_name, description, assigned_to, duedate, priority, created_by, project_id],
		
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

	db.query(`select * from tasks where task_id=${id} `, function(error,dbresponse)
	{
		res.status(200).json( dbresponse )
		
		db.end();
	})
}

var getAllTasks = function( req, res ) 
{
	db.query('select * from tasks', function( req, dbresponse )
	{
		res.status(200).json( dbresponse )

		db.end();
	})
}

module.exports = { 
	createTask,
	getTask,
	getAllTasks
}