import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getDetails = async (tmdb_id: string, media_type: string)=>{
    const details = await client.request(`/${media_type}/${tmdb_id}`) 
    return details;
}