import { configureStore, createSlice }  from '@reduxjs/toolkit';

const projectSlice = createSlice(
{
    name : 'projects',

    initialState : [],

    reducers : 
    {
        addProject : function( state, action )
        {
            state.push( action.payload )
        },

        removeProject : function( state, action ) 
        {

        }
        
    }
})

const store = configureStore(
{
    reducer: 
    {
        projects : projectSlice.reducer
    }
})

export { store };