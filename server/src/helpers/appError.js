class AppError extends Error
{
    constructor( message, statusCode)
    {
        super( message );
        
        this.status = `${statusCode}`.startsWith('4') ? 'FAILED' : 'error';

        this.statusCode = this.statusCode;

        this.canShowError = true;

        Error.captureStackTrace( this, this.constructor );
    }
}

module.exports = AppError;