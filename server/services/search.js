const { tmdbClient } = require('../api/client');
const client = new tmdbClient();

const getSearchData = async (query)=>{
        const data = await client.request(`/search/multi?query=${query}`)
        return data;
}

module.exports = { getSearchData }