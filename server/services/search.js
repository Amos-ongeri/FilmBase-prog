const { tmdbClient } = require('../api/client');
const client = new tmdbClient();

const getSearchData = async (query,page)=>{
        const data = await client.request(`/search/multi?query=${query}&page=${page}`)
        return data;
}

module.exports = { getSearchData }