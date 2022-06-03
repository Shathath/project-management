import { Fragment ,useEffect } from "react";

import {  useDispatch, useSelector } from "react-redux";
import Card from "./components/cardComponent";

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

	return (
		<Fragment>
			<main className="pro-container--main">

				<header className="bold mL10 mL30 mT30 font20">My Projects</header>

				<section className="mL30 mT20 flex">
					{ isLoading ? <h2>Loading....</h2> :
						projects.length > 0 && projects.map((project) => 
						{
							return <Card type="nameonly" value={project.name} /> 
						})  
					}
				</section>
				

			</main>
		</Fragment> 
		)
}
export default Projects