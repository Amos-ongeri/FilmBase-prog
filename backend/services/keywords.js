const { tmdbClient } = require('../api/client');
const client = new tmdbClient();

const getKeywords = async (query)=>{
        const keywords = await client.request(`/search/keyword?query=${query}`)
        return keywords;
}

module.exports = { getKeywords }