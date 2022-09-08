import React from 'react';

import { BrowserRouter , Routes, Route } from 'react-router-dom';

import SideBar from './components/sideBar';

import DashBoard from './dashboard';

import Projects from './projects/projects';

import ProjectsTaskList from './projects/projectsTaskList';

import './common.css'

import './components/component.css';


function ProjectManagement() 
{
	return (
		<div className="container-fluid" style={{height: "100vh"}}>		
			<div className='row' style={{height: "100vh"}}>
				<div className='col col-lg-2 border border-dark border-top-0'>
					<SideBar />
				</div>
				<div className='col'>
					<main>
						<Routes>
							<Route path="/" element={<DashBoard />}></Route>
							<Route path="projects" exact element={<Projects />}></Route>
							<Route path="projects/:id" element={<ProjectsTaskList />}></Route>
						</Routes>
					</main>
				</div>
			</div>
		</div>
		 
	)
}
export default ProjectManagement