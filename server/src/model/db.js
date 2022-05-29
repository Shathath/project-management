const { Client } = require('pg');

const connectionString = "postgresql://postgres:12345678@localhost:5432/projecttrack";


const client = new Client({ connectionString });

client.connect();

module.exports = 
{
	db : client
}