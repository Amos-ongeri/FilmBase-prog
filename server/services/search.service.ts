import { tmdbClient } from "../api/client";
const client = new tmdbClient();

export const getSearchData = async (query: string, page: string)=>{
        const data = await client.request(`/search/multi?query=${query}&page=${page}`)
        return data;
}

module.exports = { getSearchData }