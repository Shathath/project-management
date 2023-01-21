module.exports = ( code ) =>
{
    let status =  
    {
        23502  : 'DB operation failed'
    }

    return status[ code ] || "Something went wrong!!";
}