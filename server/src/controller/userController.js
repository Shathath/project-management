const Utils = require('../Utils');

const { db } = require('../model/db');


async function checkMandatoryFieldsForUserCreation( req, res, next ) 
{
	const { name, email, designation } = req.body;

	if( !name || !email || !designation ) 
	{
		return res.status(400).json({ status : "FAILED", error : "Enter mandatory fields" });
	}

	next();
}

var createUser = async function(req,res)
{
	const { name, email, designation, password : userPassword, isCreatedByAdmin  } = req.body;

	let password = isCreatedByAdmin ? Utils.generatePassword() : password;

	let hashedPassword =  await Utils.hashPassword( password );

	db.query(
 		
		"insert into users( user_name, email, designation_id, password, hashedPassword ) VALUES($1,$2,$3,$4) RETURNING *", [ name, email, designation, password, hashedPassword ],
		
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

/* Update user info 

projects assigned 
user profile photo
team associated

*/


const updateUserDetails = async function( req, res ) 
{

}

module.exports = 
{
	createUser,
	getUser,
	getAllUsers,
	usersByDesignation,
	checkMandatoryFieldsForUserCreation
}