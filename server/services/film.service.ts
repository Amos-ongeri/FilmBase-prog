import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getFilm = async (media_type: string, category: string, page: string)=>{
    const movies = await client.request(`/${media_type}/${category}?page=${page}`);
    return movies;
}