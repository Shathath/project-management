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

	return <></>

export default ProjectsTaskList;