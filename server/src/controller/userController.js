

const { db } = require('../model/db');

var createUser = function(req,res)
{
	const { name, email, designation, team } = req.body;

	db.query(
 		
		"insert into users( user_name, email, designation, team ) VALUES($1,$2,$3,$4) RETURNING *",[ name, email, designation, team],
		
		function(err, dbResponse) 
		{	
			res.status(201).json( { data : dbResponse.rows } )
	  		
			db.end();
		}
	)
}

var getUser = function(req,res)
{
	var { id } = req.params;

	db.query(`select * from users where user_id=${id} `, function(error,dbresponse)
	{
		res.status(200).json( dbresponse )
		
		db.end();
	})
}

var getAllUsers = function( req, res ) 
{
	db.query('select * from users', function( req, dbresponse )
	{
		res.status(200).json( dbresponse )
		
		db.end();
	})
}

module.exports = 
{
	createUser,
	getUser,
	getAllUsers
}