import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = 
{
  isloading: false,

  projects : [],
}

export const fetchProjects = createAsyncThunk('projects/getprojects', async(thunAPI) =>
{
	const projects =  await axios.get('http://localhost:8000/getallprojects');

	return projects.data;
})

export const createProject = createAsyncThunk('projects/createproject', async(name) => 
{
	const project = await axios.post('http://localhost:8000/createproject', { name : name, id : 1 } );

	return project.data;
});

export const projectSlice = createSlice(
 {
  
	name: 'projects',
  
	initialState,
  
	reducers: 
	{
		addProjects(state) 
		{
			state.projects = [];
		}
	},
	extraReducers  : 
	{
		[ fetchProjects.pending ] : (state,action) =>
		{
			state.isloading = true
		},

		[ fetchProjects.fulfilled ] : ( state, { payload } ) => 
		{
			state.isloading = false;

			state.projects = payload.data;
		},

		[ fetchProjects.rejected ] : ( state ) => 
		
		{
			state.isloading = false;
		},

		[ createProject.pending ] : (state,action) => 
		{
			state.isloading = true	 
		},

		[ createProject.fulfilled ] : ( state, { payload } ) => 
		{
			state.isloading = false;

			state.projects.concat(payload.data);
		},

		[ createProject.rejected ] : ( state ) => 
		
		{
			state.isloading = false;
		},
	}
  ,
})


export default projectSlice.reducer;