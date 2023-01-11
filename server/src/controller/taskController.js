const { db } = require('../model/db');

var createTask = async function(req,res)
{
	const { task_name, description, assigned_to, status, duedate, priority, created_by, project_id } = req.body;

	console.log( 'TASK', task_name );

	try 
	{
		const { rows, error  } = await db.query("INSERT INTO tasks(task_name, description, status, duedate, priority, created_by, project_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ",[task_name, description, status, duedate, priority, created_by, project_id])

		assigned_to.split(',').forEach((val) => 
		{
			db.query('INSERT INTO tasksusersmap(task_id,user_id) VALUES($1,$2)', [rows[0].task_id, val]);
		})

		res.status(200).json({ status : "success", data: rows })
	}
	catch(error)
	{
		console.log( error );

		res.status(404).json({ error : error })
	}
}

var getTask =async function(req,res)
{
	var { id } = req.params;

	const { rows, error } = await db.query(`SELECT * FROM tasks WHERE task_id=$1`, [id] );

	if( error ) 
	{
		res.status(500).json({ error : 'Not able to query db '});

		return;
	}
	res.status(200).json( { status : "success", data : rows} )
	
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