import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import { fetchProjects, fetchTasksByProjectId } from '../features/projectSlice';

import { useParams } from 'react-router-dom';

import EmptyScreen from '../components/emptyScreen';

import ModalCard from '../components/ModalCard';

import CreateTaskModal from '../tasks/createTaskModal';

function ProjectsTaskList()
{
	const { id } 	= useParams();

	const dispatch 	= useDispatch();

	const tasks 	= useSelector((state) => state.projectsVsTasks );

	const projects  = useSelector((state) => state.projects );

	const isLoading = useSelector((state) => state.isLoading );

	const [ isModalOpened, setOpenModal ] = useState(false);

	useEffect(() => 
	{
		dispatch( fetchTasksByProjectId( id ));

		if( projects.length == 0 ) 
		{
			dispatch( fetchProjects() )
		}

	},[]);


	const renderHeaderTaskList = () => 
	{
		var headers = [ { name :'ID', column : 'col-1' }, { name:'Title', column:'col-3'},{ name: 'Priority', column:'col-1' } , { name : 'Due Date', column:'col-2'},{ name : 'Assigned to', column:'col-2' }, { name : 'Created by', column : 'col-2'}, { name : 'Status', column : 'col-1' }];
		
		return  <div className="row">
					{ 
						headers.map((val ) => 
						{
							return <div className={	`${val.column} bold border1 textC` }>{val.name}</div>
						})
					} 	
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
			const { task_id : id , task_name : name, priority, duedate, assigned_to : assignedTo, user_name : createdBy, status } = task;

			return <div className="row">
						<div className="col-1 border1 p5 textC">{id}</div>
						<div className="col-3 border1 p5 textC">{name}</div>
						<div className="col-1 border1 p5 textC">{priority}</div>
						<div className="col-2 border1 p5 textC">{duedate}</div>
						<div className="col-2 border1 p5 textC">{assignedTo}</div>
						<div className="col-2 border1 p5 textC">{createdBy}</div>
						<div className="col-1 border1 p5 textC">{status}</div>
				   </div>
		})
	}

	const renderProjectName = () => 
	{
		if( projects.length == 0 ) return;

		const project = projects.filter(( project ) => project.project_id == id );

		return <div className="col-4 bold">Project - {project[0].name}</div>
	}

	const renderFilter = () => 
	{
		return <div className="col-5">Filter</div>
	}

	const renderTaskAddButton = () => 
	{
		return <div className="col-3 textE"><button className="btn-md btn-create bold font14 curP" onClick={()=>setOpenModal(true)}>Add Task</button></div>
	}

	const renderCreateFields = () => 
	{
		return <form className="row g-3">
					<header className="bold">Create Project</header>
				</form>
	}

	return (
		<React.Fragment>
			{ 
				isLoading ? <h1>Loading</h1> : 
				<>
				<section className="container">
					<div className="row mT30">
						{ renderProjectName() }
						{ renderFilter() }
						{ renderTaskAddButton() }
					</div>
					<div className="row mT30">	
						{ renderHeaderTaskList() }
						{ renderProjectTaskList() }
					</div>
				</section>
					{ isModalOpened ? <ModalCard isOpen={isModalOpened} closeModal={()=>setOpenModal(false)}><CreateTaskModal/></ModalCard> : "" }
				</>
			}	   
		</React.Fragment>
	)
}

export default ProjectsTaskList;
