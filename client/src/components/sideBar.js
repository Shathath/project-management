import React, {useState} from 'react';
import SvgIcon from '../svgicon';
import { NavLink } from 'react-router-dom';

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
						
						<NavLink activeClassName="activetab" to={option.route} className="flexAl-center linkstyle">

							{option.iconName ? <SvgIcon name={option.iconName} /> : "" }

							<div className="mL10">{option.name}</div>

						</NavLink>
				  </nav>
						
		})
	}
	return (
		 <section className="">
				{ renderOptions() }
		 </section>
	)
}

export default SideBar;