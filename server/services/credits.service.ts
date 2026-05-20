import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getCredits = async (id: string, media_type: string)=>{
    const credits = await client.request(`/${media_type}/${id}/credits`)
    return credits;
}