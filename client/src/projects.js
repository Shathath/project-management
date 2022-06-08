import React, { Fragment ,useEffect, useState } from "react";

import {  useDispatch, useSelector } from "react-redux";

import {Link} from "react-router-dom";

import Card from "./components/cardComponent";

import ModalCard from "./components/ModalCard";

import CreateProjectModal from "./createProjectPage";

import { fetchProjects } from "./features/projectSlice";

let isInitialized = false;

function Projects()
{
	const dispatch = useDispatch();

	const projects = useSelector((state) => state.projects);

	const isFetching = useSelector((state) => state.isFetching);

	const [ isCreateModalOpen, setIsCreateModal ] = useState(false)

	useEffect(()=>
	{
		if( !isInitialized )
		{
			dispatch( fetchProjects() )
		}

		isInitialized = true;
	},
	[ projects ])




	const openProjectCreateModal = () => 
	{
		setIsCreateModal( true )
	}

	return (
		<Fragment>

			<main className="pro-container--main">

				<header className="flex bold mL30 mT30 font20 jc-spacebtwn al-center">

					<div>My Projects</div>

					<button className="mR10 btn btn-md btn-create bold font14 curP" onClick={() => openProjectCreateModal() }>Add Project</button>
				
				</header>

				<section className="mL30 mT20 flex flx-wrap">

					{ isFetching ? 
						
						<h2>Loading....</h2> :
						
						projects.length > 0 && projects.map((project) => 
						{
							return <Link to={`/projects/${project.project_id}`} key={project.project_id}><Card type="nameonly" value={project.name} /></Link>
						})  
					}
				</section>

				{ isCreateModalOpen ? <ModalCard isOpen={isCreateModalOpen} closeModal={()=>setIsCreateModal(false)}><CreateProjectModal closeModal={()=>setIsCreateModal(false)} /></ModalCard>: ""}
			</main>

		</Fragment> 
		)
}
export default Projects