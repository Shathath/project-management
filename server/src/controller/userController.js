

const { db } = require('../model/db');

var createUser = function(req,res)
{
	const { name, email, designation } = req.body;

	db.query(
 		
		"insert into users( user_name, email, designation_id ) VALUES($1,$2,$3) RETURNING *", [ name, email, designation ],
		
		function( error, dbResponse) 
		{	
			if( error )
			{
				res.status(400).json({ message : "Error when creating", error :  error.message })

				return;
			}

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
		if( error )
		{
			res.status(400).json( { message : 'Not able to found'});

			return;
		}

		res.status(200).json( dbresponse )
		
		db.end();
	})
}

var getAllUsers = function( req, res ) 
{
	db.query('select * from users', function( error, dbresponse )
	{
		if( error ) 
		{
			res.status(400).json( { message : 'Not able to get Users'})

			return;
		}

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