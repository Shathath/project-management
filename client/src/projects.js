import React, {useEffect, useState} from 'react';

import useProjects from './hooks/useProjects';

function Projects()
{
	const projects = useProjects();
	

	console.log( "Rendering", projects );

	return <h1>Projects</h1>
}

export default Projects;