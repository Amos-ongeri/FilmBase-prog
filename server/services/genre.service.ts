import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getGenres = async (type: string)=>{
    const genres = await client.request(`/genre/${type}/list`);
    return genres
}