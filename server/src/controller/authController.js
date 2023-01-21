const { db }  = require('../model/db');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

async function hashPassword( password )
{
    const salt = await bcrypt.genSalt( parseInt(process.env.HASH) );

    return await bcrypt.hash( password, salt );
}

async function comparePassword(plaintextPassword, hash ) 
{
    return await bcrypt.compare(plaintextPassword, hash);
}

async function verifyToken(){

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
            const isValidCredential = await comparePassword( userPassword, rows[0].password );

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
        const hashedPasswd     = await hashPassword( password );;

        const { rows, error  } = await db.query('INSERT INTO USERS(user_name,email,password) values($1,$2,$3) RETURNING *', [ name, email, hashedPasswd ]);

        if( error ) 
        {
           return res.status( 500 ).json( {  status : "FAILED", error : error });
        }

        const token = jwt.sign( rows[0].user_id, process.env.SECRET );

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
    userSignUp
}