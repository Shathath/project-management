import { createSlice } from '@reduxjs/toolkit'

import { fetchProjects } from '../thunks/fetchProjects';

const projectsSlice = createSlice(
{
    name : 'projects',

    initialState  : 
    {
         data : [],

         isLoading : false,

         error : null
    },

    extraReducers(builder)
    {
         builder.addCase(fetchProjects.pending, (state, action) => 
         {
            state.isLoading = true;
         })

         builder.addCase(fetchProjects.fulfilled, (state, action) => 
         {
            state.isLoading = false;

            state.data = action.payload;
         })

         builder.addCase(fetchProjects.rejected, (state,action)=>
         {
            state.isLoading = false;

            state.error  = action.error
         })

    }
})

export const projectsReducer = projectsSlice.reducer;