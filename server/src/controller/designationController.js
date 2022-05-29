const { db } = require('../model/db');

var getAllDesignation  = function( req, res )
{
	db.query('select * from designation', function(error, dbResponse) 
	{
		if(err)
		{
			return;
		}

		res.status(200).json( {data : dbResponse.rows});
	})
}

var createDesignation =  function( req, res )
{
	var { name } = req.body;

	db.query(`INSERT INTO designation(name) VALUES($1) RETURNING *`, [name], function(error, dbResponse)
	{
		if(error)
		{
			return;
		}

		res.status(201).json( { data : dbResponse.rows })

		db.end();
	})
}

module.exports = { getAllDesignation, createDesignation }