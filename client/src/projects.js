import React, {useEffect, useState} from 'react';

import useProjects from './hooks/useProjects';

function Projects()
{
	const projects = useProjects();

	const renderProjects = function()
	{
		if(projects.length > 0)
		{
			return projects.map((project) => 
			{
				return <div>{project.name}</div>
			})
		}
		return "";
	}
	return renderProjects();
}

export default Projects;