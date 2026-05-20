import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getVideos = async (id: string, media_type: string)=>{
    const videos = await client.request(`/${media_type}/${id}/videos`)
    return videos;
}