import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getReviews = async (id: string, media_type: string)=>{
    const reviews = await client.request(`/${media_type}/${id}/reviews`)
    return reviews;
}