const { db } = require('../model/db');

const QueryBuilder = require("../helpers/queryBuilder")


async function checkTaskCreateMandatoryFieldExists( req, res, next ) 
{
	const { task_name, project_id, module_id, created_by } = req.body;

	if( !task_name || !project_id || !module_id || !created_by ) 
	{
		return res.status( 400 ).json( {  success : "FAILED", error : "Mandatory Fields Missing" });
	}

	next();
}

var createTask = async function(req,res)
{
	const { task_name, description, assigned_to, status, duedate, priority, created_by, project_id, module_id } = req.body;

	try 
	{
		const { rows, error  } = await db.query("INSERT INTO tasks(task_name, description, status, duedate, priority, created_by, project_id, module_id) VALUES($1,$2,$3,$4,$5,$6,$7, $8) RETURNING * ",[task_name, description, status, duedate, priority, created_by, project_id, module_id])

		if( error ) 
		{
			res.status( 500 ).json(
				{
					status : 'FAILED',
		
					error : 'Not able to QUERY DB'
				})
		}

		assigned_to && assigned_to.split(',').forEach((val) => 
		{
			db.query('INSERT INTO tasksusersmap(task_id,user_id) VALUES($1,$2)', [rows[0].task_id, val]);
		})

		res.status(200).json({ status : "success", data: rows })
	}
	catch(error)
	{
		res.status(404).json({ error : error })
	}
}

var getTask = async function(req,res)
{
	var { id } = req.params;

	const { rows, error } = await db.query(`SELECT * FROM tasks WHERE task_id=$1`, [id] );

	if( error ) 
	{
		res.status(500).json({ error : 'Not able to query db '});

		return;
	}
	res.status(200).json( { status : "success", data : rows} );
}

var getAllTasks = async function( req, res ) 
{
	const queryParams = req.query;

	let QUERY = `SELECT * FROM tasks`;

	let  finalQuery = "";

	let values  = [];

	const queryLength = Object.keys( queryParams ).length;

	Object.keys( queryParams ).forEach(( field, index ) => 
	{
		finalQuery+=' '+field+'= $'+[index+1]

		if( queryLength - 1 !== index ) 
		{
			finalQuery+=" AND";
		}

		values.push( decodeURIComponent(queryParams[ field ]) );
	})

	if( queryLength )
	{
		QUERY = QUERY+" "+"WHERE"+ finalQuery;
	}

	const { rows, error } = await db.query(QUERY, values);

	if( error )
	{
		return res.status( 500 ).json(
		{
			status : 'FAILED',

			error : 'Not able to QUERY DB'
		})
	}

	res.status(200).json( { status  : "success", data : rows } );
}

async function updateTask( req, res ) 
{
	let { id } = req.params;

	const { query, values } = QueryBuilder.createUpdateQuery(
	{
		tableName : "tasks",

		columns :  req.body,

		whereClasueColumn : "task_id"
	})

	values.push( id );

	const { rows , error } = await db.query( query, values );

	if( error ) 
	{
		return res.status( 400 ).json({ status : "Failed", message : "unable to execute db query"});
	}

	return res.status(200).json({ status : "success", data :  rows });
}

module.exports = { 
	createTask,
	getTask,
	getAllTasks,
	updateTask,
	checkTaskCreateMandatoryFieldExists
}