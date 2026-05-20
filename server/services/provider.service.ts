import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getWatchProviders = async (media: string, id: string) => {
    const providers = await client.request(`/${media}/${id}/watch/providers`);
    return providers;
}