const { Pool } = require('pg');

const connectionString = "postgresql://postgres:@Rahman1290@localhost:5432/postgres";


const pool = new Pool({ connectionString });

module.exports = 
{
	db : pool
}