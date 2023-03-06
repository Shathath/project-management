import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { fetchProjects } from '../../store/store';

import Spinner from './generic/Spinner';


function ProjectsList()
{
    const dispatch = useDispatch();

    const { isLoading, data, error } = useSelector((state)=>
    {
        return state.projects;
    });

    useEffect(()=>
    {
        dispatch( fetchProjects() );

    }, [ dispatch ] )

    return <main className='full-height'>
        {isLoading && <Spinner width="100" height="50"></Spinner>}
        { data && <p>Data Loaded</p> }
        { error && <p>{error}</p>}
    </main>
}

export default ProjectsList;