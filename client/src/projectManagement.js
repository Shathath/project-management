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
		<div className="pro-container">		
			<BrowserRouter>
				<SideBar />
				<Routes>
					<Route path="dashboard" element={<DashBoard />}></Route>
					<Route path="projects" exact element={<Projects />}></Route>
					<Route path="projects/:id" element={<ProjectsTaskList />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
		 
	)
}
export default ProjectManagement