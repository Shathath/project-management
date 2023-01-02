const { db } = require('../model/db');

var createUser = async function(req,res)
{
	const { name, email, designation } = req.body;

	if( !name ) 
	{
		return res.status(200).json({ error: "Enter mandatory fields!!!"})
	}

	//var hashedPassword = await Utils.generatePassword( password );

	db.query(
 		
		"insert into users( user_name, email, designation_id ) VALUES($1,$2,$3) RETURNING *", [ name, email, designation ],
		
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

const userLogin = async function( req, res ) 
{
	var { email, password : userPassword } = req.params;

	try 
	{
		const { rows } = await db.query('SELECT * FROM users WHERE email=$1 AND password=$2', [ email, password ]);
		
		res.status( 200 ).json( { status: "success", data : rows })
	}
	catch(error)
	{
		res.status(400).json( { error : 'Not able to connect data model'});
	}
}

const getAllUsers = async function( req, res ) 
{
	try 
	{
		const { rows } = await db.query('SELECT * FROM users');

		res.status(200).json({ status : "success", data : rows });
	}
	catch(error){
		 
		res.status(400).json({ message : 'Not able to get Users'});
	}
}

const usersByDesignation = async function( req, res )
{
	const { id } = req.params;

	try
	{
		const { rows } = await db.query(`SELECT * FROM USERS WHERE DESIGNATION_ID = $1`, [id]);

		res.status(200).json( { data : rows });
	}
	catch(error)
	{
		res.status(400).json( { message : 'Not able to get Users'});
	}
	finally
	{
		
	}
}

module.exports = 
{
	createUser,
	getUser,
	getAllUsers,
	userLogin,
	usersByDesignation
}