import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getTrending = async (media_type: string, time_window: string ) =>{
    const trending = await client.request(`/trending/${media_type}/${time_window}`)
    return trending;
}