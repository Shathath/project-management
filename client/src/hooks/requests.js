const API_URL = 'http://localhost:8000';

async function httpGetProjects()
{
	const response = await fetch(`${API_URL}/getallprojects`)

	return await response.json();
}

export 
{
	httpGetProjects
}