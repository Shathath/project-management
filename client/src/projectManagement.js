import React from 'react';

import { BrowserRouter , Routes, Route } from 'react-router-dom';

import SideBar from './components/sideBar';

import DashBoard from './dashboard';

import Projects from './projects';

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
					<Route path="projects" element={<Projects />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
		 
	)
}

export default ProjectManagement