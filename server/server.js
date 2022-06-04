var  bcrypt  =  require('bcryptjs');

var generatePassword = async function( password )
{

	var hashedPassword =  await bcrypt.hash(password, 8);

	console.log( hashedPassword );
}

generatePassword( "1290@Rahman!!")