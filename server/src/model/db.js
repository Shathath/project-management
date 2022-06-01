const { Pool } = require('pg');

const connectionString = "postgresql://postgres:12345678@localhost:5432/projecttrack";


const pool = new Pool({ connectionString });

module.exports = 
{
	db : pool
}