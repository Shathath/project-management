const nodeEmailer = require('nodemailer');

const sendEmail = async ( options ) => 
{
    // 1. Create a transporter

    var transPorterOptions = 
    {
        host : process.env.EMAIL_HOST,

        port : process.env.EMAIL_PORT,

        auth : 
        {
            user : process.env.EMAIL_USERNAME,
            
            pass : process.env.EMAIL_PASSWORD
        }
    }
    const transporter = nodeEmailer.createTransport( transPorterOptions );

    // 2. Define Email Options

    const mailOptions = 
    {
        from : 'Shathath rahman <shathathrahman@ecyber.com>',

        to    : options.email,

        subject : options.subject,

        text : options.message
    }

    //console.log( mailOptions, transporter )

    transporter.sendMail( mailOptions )
}

module.exports = { sendEmail }