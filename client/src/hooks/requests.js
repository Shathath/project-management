import axios from 'axios';

const API_URL = 'http://localhost:8000';

async function httpGetProjects()
{
	const response = await axios.get(`${API_URL}/getallprojects`);

	console.log( "Response", response );

	return response;
}

export 
{
	httpGetProjects
}