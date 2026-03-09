const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
    }
})

const getSearchData = async (query)=>{
    try{
        const { data } = await tmdb.get(`/search/multi?query=${query}`)
        return data;
    }catch(e){
        throw e;
    }
}

module.exports = { getSearchData }