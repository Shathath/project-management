const { db } = require('../model/db');

async function checkModuleNameExist( req, res, next ) 
{
    let  { name } = req.body;

    if( !name ) 
    {
        return res.status(400).json({ status : 'FAILED', error : 'Need to Give name for Module'});
    }

    next();
}

async function checkModuleId( req, res, next, id ) 
{
    if( !id ) 
    {
        return res.status(400).json({ status : 'FAILED', error : 'Need to Give name for Module'});
    }

    next();
}

async function createModule(req,res)
{
    const { name } = req.body;

    const { rows, error } = await db.query('INSERT INTO modules(name) VALUES($1) RETURNING *', [ name ]);

    if( error ) 
    {
       return res.status( 500 ).json( {  status : "FAILED", data  : "Not able to execute query" })
    }

    res.status( 200 ).json( {  status : "SUCCESS", data : rows });
}

async function deleteModule( req, res ) 
{
    const { id } = req.body;

    const  { rows , error } = await db.query('DELETE FROM modules WHERE module_id=$1',[ id ]);

    if( error ) 
    {
        return res.status( 500 ).json({ status : "FAILED", message : 'Not able to execute query' });
    }

    res.status( 200 ).json( { status : "success" });
}

async function getModules( req, res ) 
{
    const { rows, error } = await db.query('SELECT * FROM modules');

    if( error ) 
    {
       return  res.status( 500 ).json({ status : "FAILED", message : 'Not able to execute query' })
    }
    
    res.status(200).json({ status : "success", data : rows });
}

module.exports = 
{
    createModule,
    
    deleteModule,

    getModules,

    checkModuleNameExist,

    checkModuleId
}