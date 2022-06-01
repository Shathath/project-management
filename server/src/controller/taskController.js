const {response}=require('express');
const { db } = require('../model/db');

var createTask = function(req,res)
{
	const { task_name, description, assigned_to, duedate, priority, created_by, project_id } = req.body;

	db.query(
 		
		"insert into tasks( task_name, description, assigned_to, duedate, priority, created_by, project_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[task_name, description, assigned_to, duedate, priority, created_by, project_id],
		
		function(error, dbResponse) 
		{	
			if(error)
			{
				res.status(400).json({ error : error.message});

				return
			}

			res.status(201).json( { data : dbResponse.rows } )
		}
	)
}

var getTask = function(req,res)
{
	var { id } = req.params;

	db.query(`select * from tasks where task_id=${id} `, function(error,dbresponse)
	{
		if( error ) 
		{
			res.status(500).json({ error : 'Not able to query db '});

			return;
		}
		res.status(200).json( dbresponse )
	})
}

var getAllTasks = function( req, res ) 
{
	db.query('select * from tasks', function( error, dbResponse )
	{
		if( error ) 
		{
			res.status(500).json({ error : 'Not able to query db '});

			return;
		}

		res.status(200).json( { data : dbResponse.rows} )
	})
}

module.exports = { 
	createTask,
	getTask,
	getAllTasks
}