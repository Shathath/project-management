var  bcrypt  =  require('bcryptjs');

const generatePassword = function()
{
	return Math.random().toString(36).slice(2, 10);

}

async function hashPassword( password )
{
    const salt = await bcrypt.genSalt( parseInt(process.env.HASH) );

    return await bcrypt.hash( password, salt );
}

async function comparePassword( plaintextPassword, hash ) 
{
    return await bcrypt.compare( plaintextPassword, hash);
}

const isPasswordMatch = async function( userPassword, dbPassword )
{
	return await bcrypt.compare( userPassword, dbPassword );
}

const isEmptyString = function( str )
{
	return typeof str !=="undefined" && str !== null  && typeof str == "string" && str.trim().length == 0;
}


module.exports = {  generatePassword, isPasswordMatch, isEmptyString, hashPassword, comparePassword }
