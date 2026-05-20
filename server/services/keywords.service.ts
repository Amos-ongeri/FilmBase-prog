import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getKeywords = async (query: string)=>{
        const keywords = await client.request(`/search/keyword?query=${query}`)
        return keywords;
}

module.exports = { getKeywords }