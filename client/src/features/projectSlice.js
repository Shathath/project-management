import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = 
{
  isloading: false,

  projects : [],
}

export const fetchProjects = createAsyncThunk('projects/getprojects', async(thunAPI) =>
{
	const projects =  await axios('http://localhost:8000/getallprojects');

	return projects.data;
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
			state.isloading = true
		},

		[ fetchProjects.fulfilled ] : ( state, { payload } ) => 
		{
			state.isloading = false;

			console.log( payload.data );
			state.projects = payload.data;
		},

		[ fetchProjects.rejected ] : ( state ) => 
		{
			state.isloading = false;
		}
	}
  ,
})


export default projectSlice.reducer;