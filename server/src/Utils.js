var  bcrypt  =  require('bcryptjs');

const generatePassword = async function( password )
{
	return await bcrypt.hash(password, 8);

}

const isPasswordMatch = async function( userPassword, dbPassword )
{
	return await bcrypt.compare( userPassword, dbPassword );
}



module.exports = {  generatePassword, isPasswordMatch }