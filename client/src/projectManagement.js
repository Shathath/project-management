import React from 'react';

import { BrowserRouter , Routes, Route } from 'react-router-dom';

import SideBar from './components/sideBar';

import './component.css';

import './common.css'

function ProjectManagement() 
{
	return (
		<div className="pro-container">		
			<BrowserRouter>
				<SideBar />
				<Routes>
					<Route path="dashboard" element={<Dashboard />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
		 
	)
}
const Dashboard = () => <h1>Hello</h1>
export default ProjectManagement