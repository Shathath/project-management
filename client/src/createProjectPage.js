import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClientUtils } from './Utils/utils';
import { createProject } from './features/projectSlice'


function CreateProjectModal( props ) 
{
	const [ name, setName ] = useState("");

	const isLoading = useSelector((state) =>  state.isloading )

	const dispatch = useDispatch();

	const onCreateProject = function(event) 
	{
		event.preventDefault();

		if( ClientUtils.isEmptyString( name ) )
		{
			return;
		}

		dispatch( createProject( name ) )

		props.closeModal( false );
	}

	const cancelCreate = () => 
	{
		props.closeModal( false )
	}

	const getProjectCreateFields = () => 
	{
		return <React.Fragment>
					<form className="row g-3">
						<div className="col-md-12">
							<header className="bold">Create Project</header>
							{ isLoading ? <div class="d-flex align-items-center">
  									<strong>Loading...</strong>
  									<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
								</div>  : ""
							}	
						</div>
						<div className="col-md-12">
							<label htmlFor="projectname" className="form-label bold required">Project Name</label>
							<input type="text" className="form-control" id="projectname" placeholder="Enter your placeholder here" autoComplete="off" onChange={(e)=> setName(e.target.value)}/>
						</div>
						<div className="col-12 d-flex justify-content-end">
							<button type="submit" className="btn btn-cancel float-end mL10" onClick={cancelCreate}>Cancel</button>
							<button type="submit" className="btn btn-primary mL10" onClick={onCreateProject}>Create</button>
						</div>
					</form>
				</React.Fragment>
	}

	return getProjectCreateFields()
}

export default CreateProjectModal;