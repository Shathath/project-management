const { db } = require('../model/db');

const { isEmptyString } = require('../Utils');

const AppError = require('../helpers/appError');

const errorDefinitions = require('../helpers/errorDefinitions');



var getAllProjects  = async function( req, res, next )
{
	let QUERY = 'SELECT * FROM projects';

	let values = [];

	try 
	{
		const { rows } = await db.query( QUERY, values );

		if( rows.length > 0 ) 
		{
			const { rows: taskRows } = await db.query("SELECT project_id, COUNT( * ) FROM tasks GROUP BY project_id");

			rows.forEach((rowObj) => 
			{
				let matchedCountObj = taskRows.filter((taskObj) => taskObj.project_id == rowObj.project_id );

				Object.assign( rowObj , matchedCountObj[0] )
			})
		}
		return res.status( 200 ).json({ data : rows });

	}
	
	catch(err)
	{
		return next( new AppError( errorDefinitions(err.code), 500 ) );
	}
}

var getProject = async function( req, res , next)
{
	try 
	{
		const { rows, error } = await db.query('SELECT * FROM projects WHERE project_id=$1', [id ]);

		if( error ) 
		{
			return new AppError(`Operation Failed! Something went wrong!!`, 500 );
		}

		res.status(200).json({ data : rows });
	}
	catch(err)
	{
		return next( new AppError( errorDefinitions(err.code), 500 ) );
	}
}

var getTaskByProject = async function( req, res )
{
	const { id } = req.params;

	try 
	{
		const { rows } = await db.query(`SELECT * FROM tasks
												LEFT JOIN
												(SELECT users.user_name, users.user_id from users) users 
												ON tasks.created_by = users.user_id
												WHERE project_id=$1
												`, [ id ]);

		res.status( 201 ).json( { data :  rows }) ;												
											
	}
	catch(err)
	{
		return next( new AppError( errorDefinitions(err.code), 500 ) );
	}
}

var createProject = async function( req, res, next )
{
	var { name, created_by } = req.body;

	console.log( name, created_by )

	try 
	{
		const { rows }  = await db.query('INSERT INTO projects( name, created_by ) VALUES($1, $2) RETURNING *', [ name, created_by ]);

		if( rows.length ) 
		{
			return res.status( 201 ).json( { status : "success", data : rows });
		}
		
	}

	catch(err)
	{	
		return next( new AppError( errorDefinitions(err.code), 500 ) );
	}
}


var getProjectsFilterQuery  = function( req ) 
{
	let clause = " WHERE";

	let finalQuery  = "";

	let paramsLen = Object.keys(req.query).length;

	let values = [];

	Object.keys( req.query ).forEach((key, index) => 
	{
		let dollarIndex = "$"+( index + 1 ); 

		finalQuery +=` ${key}=${dollarIndex}`;

		if( paramsLen - 1 !== index ) 
		{
			finalQuery +=" AND";
		}

		values.push( req.query[ key ] );
	})

	let query =  clause + finalQuery;

	return { filterQuery : query, values };
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
		const { rows, error  } =  await db.query(`SELECT * FROM projectsusersmap 
											LEFT JOIN projects ON projects.project_id = $1
											LEFT JOIN users u ON u.user_id = projectsusersmap.user_id
										`, [ id ] );

		if( error )
		{
			return new AppError(`Operation Failed! Something went wrong!!`, 500 );
		}

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