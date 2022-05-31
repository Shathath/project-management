import React, {useState} from 'react';
import SvgIcon from '../svgicon';

function SideBar()
{
	const [options ] = useState(
	[
		{
			name : 'Dashborad',
			iconName : 'dashBoard' 
		},
		{
			name : 'Projects',
			iconName : 'projects'
		},
		{
			name : 'Tasks',
			iconName : 'tasks'
		}
	])
	const renderOptions = function()
	{
		return options.map((option)=> 
		{
			return <div className="flexAl-center pro-sidebar__list mT10">
					  
					  {option.iconName ? <SvgIcon name={option.iconName} /> : "" }
					  
					  <div className="mL10">{option.name}</div>
					
					</div>
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