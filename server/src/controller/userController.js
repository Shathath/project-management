

const { db } = require('../model/db');

const Utils = require('../Utils');

var createUser = async function(req,res)
{
	const { name, email, designation, password } = req.body;

	if( !password  || !name ) 
	{
		return res.status(200).json({ error: "Enter mandatory fields!!!"})
	}

	var hashedPassword = await Utils.generatePassword( password );

	db.query(
 		
		"insert into users( user_name, email, designation_id, password ) VALUES($1,$2,$3,$4) RETURNING *", [ name, email, designation, hashedPassword ],
		
		function( error, dbResponse) 
		{	
			if( error )
			{
				res.status(500).json({error : error.message});

				return;
			}

			res.status(201).json( { data : dbResponse.rows } )
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
			res.status(500).json({error : error.message});
			
			return;
		}

		res.status(200).json( { data: dbresponse.rows } )
	})
}

var userLogin = function( req, res ) 
{
	var { email, password : userPassword } = req.params;

	db.query(`select * from users where email=${email}`, function( error, dbResponse) 
	{
		if(error)
		{
			res.status(500).json({error : error.message});

			return;
		}

		var { password }  = dbResponse.rows[0];

		if( Utils.isPasswordMatch( password, userPassword )) 
		{
			res.status(200).json( { data: dbResponse.rows });

			return;
		}
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
	getAllUsers,
	userLogin
}