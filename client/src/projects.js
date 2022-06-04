import React, { Fragment ,useEffect, useState } from "react";

import {  useDispatch, useSelector } from "react-redux";

import Card from "./components/cardComponent";

import ModalCard from "./components/ModalCard";

import CreateProjectModal from "./createProjectPage";

import { fetchProjects } from "./features/projectSlice";

function Projects()
{
	const dispatch = useDispatch();

	const projects = useSelector((state) => state.projects);

	const isLoading = useSelector((state) => state.isloading);

	const [ isCreateModalOpen, setIsCreateModal ] = useState(false)

	useEffect(()=>
	{
		dispatch( fetchProjects() )
	},
	[])

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

				<section className="mL30 mT20 flex">

					{ isLoading ? 
						
						<h2>Loading....</h2> :
						
						projects.length > 0 && projects.map((project) => 
						{
							return <Card type="nameonly" value={project.name} /> 
						})  
					}
				</section>

				{ isCreateModalOpen ? <ModalCard isOpen={isCreateModalOpen} closeModal={()=>setIsCreateModal(false)}><CreateProjectModal closeModal={()=>setIsCreateModal(false)} /></ModalCard>: ""}
			</main>

		</Fragment> 
		)
}
export default Projects