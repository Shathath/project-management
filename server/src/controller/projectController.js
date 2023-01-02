const { db } = require('../model/db');

const { isEmptyString } = require('../Utils');

var getAllProjects  = function( req, res )
{
	db.query('select * from projects', function(error, dbResponse) 
	{
		if(error) return res.json({ message : error.message});

		res.status(200).json( {data : dbResponse.rows});
	})
}

var getProject = function( req, res )
{
	db.query( `select * from projects where project_id=${id}`, function( error, dbResponse)
	{
		if( error ) return res.json({ message : error.message});

		res.status(200).json({ data : dbResponse.rows });
	})
}

var getTaskByProject = function( req, res )
{
	const { id } = req.params;

	db.query( `select * from tasks left join ( select users.user_name, users.user_id from users ) users on tasks.created_by = users.user_id where project_id=${id}`, function( error, dbResponse)
	{
		if( error ) return res.json({ message : error.message});

		res.status(200).json({ data : dbResponse.rows });
	})
}

var createProject =  function( req, res )
{
	var { name, created_by } = req.body;

	db.query(`insert into projects(name,created_by) values($1,$2) returning *`, [name, created_by], function(error, dbResponse)
	{
		if(error) return res.status(400).json({ error : error.message});

		res.status(201).json( { data : dbResponse.rows })
	})
}


var getProjectsByLimit = function(req, res)
{
	let hasSearch, hasPagination, hasLimit = false;

	var { page_no : page_no, limit, search : searchText  }  = req.body;

	page_no = page_no > 1 ?  ( page_no - 1 ) * limit : 0;

	if( !isEmptyString( searchText ) ) { hasSearch = true;  }

	if( hasSearch ) 
	{
		db.query(`select * from projects where name like $1 limit $2 offset $3`, [ `%${searchText}%`, limit , page_no ], function(error, dbResponse) 
		{
			if(error) return res.status(400).json({error : error.message});
	
			res.status(200).json({data: dbResponse.rows });
		})

		return;
	}

	db.query(`select * from projects limit $1 offset $2`, [ limit , page_no ], function(error, dbResponse) 
	{
		if(error) return res.status(400).json({error : error.message});

		res.status(200).json({data: dbResponse.rows });
	})
}

const getProjectUsers = async function( req, res )
{
	let { id } = req.params;

	try 
	{
		const { rows } =  await db.query(`SELECT * FROM projectsusersmap 
											LEFT JOIN projects ON projects.project_id = $1
											LEFT JOIN users u ON u.user_id = projectsusersmap.user_id
										`, [ id ] );

		res.status(200).json({ status : "success", data : rows })
	}
	catch( error )
	{
		res.status(202).json({ status : "Failed", msg  : error})
	}
}

const addUsersToProject = async function( req, res ) 
{
	let { project_id, users_id } = req.body;

	try 
	{
		const { rows } =  await db.query('INSERT INTO projectsusersmap(project_id, user_id) values($1,$2) RETURNING *', [ project_id, users_id ] );

		res.status(200).json({ status : "success", data : rows })
	}
	catch(error)
	{
		res.status(202).json({ status : "Failed", msg  : error})
	}
}

module.exports = { getAllProjects, createProject, getProject,getTaskByProject, getProjectsByLimit, getProjectUsers, addUsersToProject }