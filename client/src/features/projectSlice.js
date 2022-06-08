import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = 
{
  isFetching: false,

  isLoading :  false,

  projects : [],

  projectsVsTasks : {}
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

export const fetchTasksByProjectId = createAsyncThunk('projects/gettasks', async(id) => 
{
	const tasks = await axios.get(`http://localhost:8000/getprojecttasks/${id}`);

	return tasks.data;
})

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
			state.isFetching = true
		},

		[ fetchProjects.fulfilled ] : ( state, { payload } ) => 
		{
			state.isFetching = false;

			state.projects = payload.data;
		},

		[ fetchProjects.rejected ] : ( state ) => 
		{
			state.isFetching = false;
		},

		[ createProject.pending ] : (state,action) => 
		{
			state.isLoading = true	 
		},

		[ createProject.fulfilled ] : ( state, { payload } ) => 
		{
			state.isLoading = false;

			state.projects = state.projects.concat(payload.data);
		},

		[ createProject.rejected ] : ( state ) => 
		{
			state.isLoading = false;
		},
	
		[ fetchTasksByProjectId.pending ] : (state,action) => 
		{
			state.isLoading = true;
		},

		[ fetchTasksByProjectId.fulfilled ] : ( state, { payload } ) => 
		{
			state.isLoading = false;

			const { data } = payload;

			state.projectsVsTasks[ data[0].project_id ] = data;
		},

		[ fetchTasksByProjectId.rejected ] : ( state ) => 
		{
			state.isLoading = false;
		},
	}
  ,
})


export default projectSlice.reducer;