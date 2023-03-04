import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from '../../hooks/usefetch';

import { fetchProjects } from '../../store/store';

function ProjectsList()
{
    const dispatch = useDispatch();

   // const response = useFetch('/v1/projects');

   // console.log( response );

    const { isLoading, data, error } = useSelector((state)=>
    {
        return state.projects;
    });

    useEffect(()=>
    {
        dispatch( fetchProjects() );

    }, [] )

    console.log( isLoading );

    return <main>
        {isLoading && <p>Loading...</p>}
        { data && <p>Data Loaded</p> }
        { error && <p>{error}</p>}
    </main>
}

export default ProjectsList;