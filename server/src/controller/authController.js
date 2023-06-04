const { db }  = require('../model/db');

const jwt = require('jsonwebtoken');

const AppError = require('../helpers/appError');

const bcrypt = require('bcrypt');

const Utils = require('../Utils')

const crypto  = require('crypto');

const { sendEmail } = require('../helpers/email')


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

        if( error ) 
        {
           return res.status( 500 ).json( {  status : "FAILED", error : error });
        }

        const token = jwt.sign( { id : rows[0].user_id }, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRESIN } );

        res.status( 200 ).json( { status: "success", token, data : { name, email } })
    }
    catch(error)
    {
        res.status( 500 ).json( {  status : "FAILED", error : error });
    }
}

async function forgotPassword( req, res, next) 
{

    let { email } = req.body;

    try 
    {
        //1. Get user from db

        var { rows: userRows, error: userError }   = await db.query(`SELECT * FROM USERS WHERE EMAIL=$1`,[ email ]);

        if( !userRows.length ) 
        {
            return next( new AppError('Users doesnt exist', 404))
        }

        console.log( email );

         //2.  Generate random token and assigned to user

        const resetToken = Utils.generateResetToken();
        
        const encryptResetToken = Utils.encryptResetToken( resetToken );
        
        const expiryDate = new Date(Date.now() + ( 10 * 60 * 1000 ));

        const { rows, error } = await db.query('UPDATE users SET passwordresettoken=$1, passwordresettokenexpiresin=$2 where user_id=$3',[ encryptResetToken, expiryDate, userRows[0].user_id ])
        
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

        console.log( resetURL )

        const message  = `Forgot your password ? Submit your new password in this url ${resetURL} this link will be valid for 10 minutes.`
            
        await sendEmail({ email, message, subject : 'Password reset' });

        console.log( "Test ")

        return res.status(200).json( { status : "success", message : 'Reset password link to the email successfully!.'})
        
        //3. send the token to user

    }
    catch(e)
    {
        await db.query('UPDATE users SET passwordresettoken=$1, passwordresettokenexpiresin=$2 where user_id=$3',[ null, null, userRows[0].user_id ])
    
        return res.status(400).json({ status : "failed", error : e  })
    }
    
}

module.exports = 
{
    userLogin,
    userSignUp,
    verifyUser,
    forgotPassword
}