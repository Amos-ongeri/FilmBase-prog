import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getDiscover = async (type: string, page: string) => {
    const discover = await client.request(`/discover/${type}?page=${page}`)
    return discover;
}
