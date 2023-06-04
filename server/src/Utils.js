var  bcrypt  =  require('bcryptjs');

const cryto = require('crypto');

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

function generateResetToken()
{
    return cryto.randomBytes(32).toString('hex');
}

function encryptResetToken( token ) 
{
    return cryto.createHash( 'sha256' ).update(token).digest('hex');
}

const isPasswordMatch = async function( userPassword, dbPassword )
{
	return await bcrypt.compare( userPassword, dbPassword );
}

const isEmptyString = function( str )
{
	return typeof str !=="undefined" && str !== null  && typeof str == "string" && str.trim().length == 0;
}


module.exports = {  
    generatePassword, 
    isPasswordMatch, 
    isEmptyString, 
    hashPassword, 
    comparePassword,
    generateResetToken,
    encryptResetToken
}
