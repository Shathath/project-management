const { db }  = require('../model/db');

const jwt = require('jsonwebtoken');

const AppError = require('../helpers/appError');

const bcrypt = require('bcrypt');

const Utils = require('../Utils')


async function verifyUser( req, res, next )
{
    if( req.headers.authorization ) 
    {
        const token             = req.headers.authorization.split(" ")[1]
        
        const decoded           = jwt.verify( token, process.env.JWT_SECRET );

        const { rows, error }   = await db.query(`SELECT * from users where user_id=$1`, [ decoded.id ]);

        /* User present */
        if( rows.length > 0 )
        {
            req.user = rows;
        }
        else 
        {
            return next(new AppError('User not found!', 401));
        }

        var passwordChangedTime =  parseInt(new Date(rows[0].passwordchangedat).getTime()/1000);

        if( decoded.iat < passwordChangedTime ) 
        {
            return next( new AppError("You have changed the password, plz login", 401))
        }

    }

    next()
}

const userLogin = async function( req, res ) 
{   
	var { email, password : userPassword } = req.body;

	try 
	{
		const { rows, error } = await db.query('SELECT * FROM users WHERE email=$1', [ email ]);

        if( error ) 
        {
            return res.status( 500 ).json( { error : 'Failed' });
        }

        if( rows.length > 0 ) 
        {
            const isValidCredential = await Utils.comparePassword( userPassword, rows[0].password );

            if( !isValidCredential ) 
            {
                return res.status( 500 ).json({ error : "Email or password is wrong" });
            }

            delete rows[0].password;

            res.status( 200 ).json( { status: "success", data : rows })
        }
		
	}
	catch(error)
	{
		res.status(400).json( { error : 'Not able to connect data model' });
	}
}

const userSignUp = async function( req, res ) 
{
    const { name , email, password } = req.body;

    try 
    {
        const hashedPasswd     = await Utils.hashPassword( password );;

        const { rows, error  } = await db.query('INSERT INTO USERS(user_name,email,password,originalpassword) values($1,$2,$3,$4) RETURNING *', [ name, email, hashedPasswd, password ]);

        console.log( rows );

        if( error ) 
        {
           return res.status( 500 ).json( {  status : "FAILED", error : error });
        }

        const token = jwt.sign( { id : rows[0].user_id }, process.env.JWT_SECRET );

        res.status( 200 ).json( { status: "success", token, data : { name, email } })
    }
    catch(error)
    {
        res.status( 500 ).json( {  status : "FAILED", error : error });
    }
}

module.exports = 
{
    userLogin,
    userSignUp,
    verifyUser
}