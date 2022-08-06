var  bcrypt  =  require('bcryptjs');

const generatePassword = async function( password )
{
	return await bcrypt.hash(password, 8);

}

const isPasswordMatch = async function( userPassword, dbPassword )
{
	return await bcrypt.compare( userPassword, dbPassword );
}

const isEmptyString = function( str )
{
	return typeof str !=="undefined" && str !== null  && typeof str == "string" && str.trim().length == 0;
}


module.exports = {  generatePassword, isPasswordMatch, isEmptyString }