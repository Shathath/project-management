import { configureStore }  from '@reduxjs/toolkit';

import { projectsReducer  } from './slices/projectsSlice';

const store = configureStore(
{
    reducer: 
    {
        projects : projectsReducer
    }
})

export { store };

export * from './thunks/fetchProjects'