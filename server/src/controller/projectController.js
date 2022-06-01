const { db } = require('../model/db');

var getAllProjects  = function( req, res )
{
	db.query('select * from projects', function(error, dbResponse) 
	{
		if(error)
		{
			return res.json({ message : error.message});
		}

		res.status(200).json( {data : dbResponse.rows});
	})
}

var getProject = function( req, res )
{
	db.query( `select * from projects where project_id=${id}`, function( error, dbResponse)
	{
		if( error )
		{
			return;
		}

		res.status(200).json({ data : dbResponse.rows });
	})
}

var createProjects =  function( req, res )
{
	var { name, created_by } = req.body;

	db.query(`insert into projects(name,created_by) values($1,$2) returning *`, [name, created_by], function(error, dbResponse)
	{
		if(error)
		{
			res.status(400).json({ error : error.message});

			return
		}

		res.status(201).json( { data : dbResponse.rows })
	})
}

module.exports = { getAllProjects, createProjects, getProject }