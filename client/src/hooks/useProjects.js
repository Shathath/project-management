import {useEffect, useState, useCallback} from 'react';

import {httpGetProjects} from './requests';

function useProjects()
{
	const [ projects, setProjects ] = useState([]);

	const getProjects = useCallback(async () => {
		
		const projectResp = await httpGetProjects();

		setProjects( projectResp.data );	
	
	},[]);

	
	useEffect(() =>{ getProjects() },[])

	return projects;
}

export default useProjects;