import React, { useState } from "react";

function CreateProject()
{
    const [ name, setName ] = useState(" ");

    const [ team, setTeam ] = useState();

    const handleAddProject = ( event ) => 
    {
        if( !name || !team ) 
        {
            return;
        }
    }

    return <div className="project--modal">
                <div className="field">
                    <label className="field--label">Project name</label>
                    <input className="input input--text" type="text" placeholder="Enter a project name" />
                </div>
                <div className="field">
                    <button className="btn btn--create">Add project</button>
                </div>
            </div>
}

export default CreateProject;