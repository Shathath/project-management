import React from 'react';

import { Link } from 'react-router-dom'

const routes = [
    {
        name : 'Dashboard',

        icon  : '',
        
        path  : '/'
    },
    {
        name : 'Projects',

        icon : '',

        path : 'projects'
    },
    {
        name : 'Tasks',

        icon : '',

        path : 'tasks'
    },
    {
        name : 'Issues',

        icon : '',

        path  : 'issues'
    }
]
function Sidebar()
{
    return <div className="sidebar">
                <div className="sidebar__wrapper">
                    { 
                       routes.map(( route, index ) => 
                        {
                            return <Link to={route.path} className="sidebar--values" key={index}>{ route.name }</Link>
                        })
                    }
                </div>
    </div>
    
}

export default Sidebar;