import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchTasksByProjectId } from './features/projectSlice';

import { useParams } from 'react-router-dom';

function ProjectsTaskList()
{
	const { id } = useParams();

	const dispatch = useDispatch();

	const tasks = useSelector((state) => state.projectsVsTasks );

	const isLoading = useSelector((state) => state.isLoading );

	useEffect(() => 
	{
		dispatch( fetchTasksByProjectId( id ));

	},[]);

	const renderProjectTaskList = () => 
	{
		if( Object.keys(tasks).length == 0 ) 
		{
			return ""
		}

		let projectTasks = tasks[id];

		return projectTasks.map((task) => 
		{
			const { task_id : id , task_name : name } = task;
			
			return <div key={id}>{name}</div>
		})
	}

	return (
	<React.Fragment>
		{ isLoading ? <h1>Loading</h1> : renderProjectTaskList() }	   
	</React.Fragment>)
}

export default ProjectsTaskList;
