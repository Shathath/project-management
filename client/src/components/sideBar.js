import React, {useState} from 'react';
import SvgIcon from '../svgicon';
import { Link } from 'react-router-dom';

function SideBar()
{
	const [options ] = useState(
	[
		{
			name : 'Dashboard',
			iconName : 'dashBoard',
			route : '/dashboard'
		},
		{
			name : 'Projects',
			iconName : 'projects',
			route : '/projects'
		},
		{
			name : 'Tasks',
			iconName : 'tasks',
			route : '/tasks'
		}
	]);

	const renderOptions = function()
	{
		return options.map((option)=> 
		{
			return <nav className="pro-sidebar__list mT10" key={option.name}>
						
						<Link to={option.route} className="flexAl-center linkstyle">

							{option.iconName ? <SvgIcon name={option.iconName} /> : "" }

							<div className="mL10">{option.name}</div>

						</Link>
				  </nav>
						
		})
	}
	return (
		 <div className="pro-sidebar flex-column">
			
			<main className="pro-sidebar__optioncontainer">
			 	
				{ renderOptions() }
			
			</main>

		 </div>
	)
}

export default SideBar;