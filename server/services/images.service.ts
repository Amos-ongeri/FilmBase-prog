import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getImages = async (media_type: string, id: string) => {
    const images = await client.request(`/${media_type}/${id}/images`);
    return images;
}