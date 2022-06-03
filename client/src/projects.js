import { Fragment ,useEffect } from "react";

import { Provider, useDispatch, useSelector } from "react-redux";

import { fetchProjects } from "./features/projectSlice";


function Projects()
{
	const dispatch = useDispatch();

	const projects = useSelector((state) => state.projects);

	const isLoading = useSelector((state) => state.isloading);

	useEffect(()=>
	{
		dispatch( fetchProjects() )
	},
	[])

	return (<Fragment>
		{ isLoading ? <h1>Loading</h1> : <h1>Proj</h1> }
	</Fragment> )
}
export default Projects