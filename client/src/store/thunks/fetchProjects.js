import { createAsyncThunk } from "@reduxjs/toolkit";

import { useFetch } from "../../hooks/usefetch";

import axios from 'axios'


export const fetchProjects = createAsyncThunk('projects/fetch', async() =>
{

    console.log( "Calling ");

    const response = await axios.get('http://localhost:8000/v1/projects');

    console.log( response );

    return response.data;
})