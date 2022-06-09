import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import { fetchTasksByProjectId } from './features/projectSlice';

import { useParams } from 'react-router-dom';

import EmptyScreen from './components/emptyScreen';

function ProjectsTaskList()
{
	const { id } 	= useParams();

	const dispatch 	= useDispatch();

	const tasks 	= useSelector((state) => state.projectsVsTasks );

	const isLoading = useSelector((state) => state.isLoading );

	useEffect(() => 
	{
		dispatch( fetchTasksByProjectId( id ));

	},[]);

	const renderHeaderTaskList = () => 
	{
		var headers = [ { name :'ID', column : 'col-1' }, { name:'Title', column:'col-3'},{ name: 'Priority', column:'col-1' } , { name : 'Due Date', column:'col-1'},{ name : 'Assigned to', column:'col-2' }, { name : 'Created by', column : 'col-2'}, { name : 'Status', column : 'col-2' }];
		
		return  <div className="row">
					{ headers.map((val ) => {
						return <div className={	`${val.column} bold` }>{val.name}</div>
					})} 	
				</div>
	}

	const renderProjectTaskList = () => 
	{
		if( Object.keys(tasks).length == 0 ) 
		{
			return <EmptyScreen />;
		}

		let projectTasks = tasks[id];


		return projectTasks.map((task) => 
		{
			const { task_id : id , task_name : name } = task;

			return <div className="row">
						<div className="col-1">{id}</div>
						<div className="col-3">{name}</div>
				   </div>
		})
	}

	return (
		<React.Fragment>
			{ 
				isLoading ? <h1>Loading</h1> : 
				<section className="container">
					{ renderHeaderTaskList() }
					{ renderProjectTaskList() }
				</section>
			}	   
		</React.Fragment>
	)
}

export default ProjectsTaskList;
