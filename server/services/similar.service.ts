import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getSimilar = async (id: string, media_type: string)=>{
    const recommended = await client.request(`/${media_type}/${id}/similar`)
    return recommended;
}