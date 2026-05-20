import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getConfigs = async () => {
    const configs = await client.request("/configuration");
    return configs;
}