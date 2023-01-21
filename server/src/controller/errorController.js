module.exports = (error, req, res, next) => 
{
    error.status  = error.status || 'FAILED';

    error.statusCode = error.statusCode || 500;

    res.status(error.statusCode).json(
    {
        status : error.status,

        message : error.message
    })
}