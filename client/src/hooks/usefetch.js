import axios from 'axios'

export async function useFetch( endPoint )
{
    var rootURL = "http://localhost:8000";

    console.log( rootURL );

    rootURL +=endPoint;

    const response = await axios.get(rootURL);

    return response;
}