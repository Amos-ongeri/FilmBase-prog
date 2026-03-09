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

const getGenres = async (type)=>{
    try{
        const { data } = await tmdb.get(`/genre/${type}/list`)
        return data;
    }catch(e){
        throw e;
    }
}

module.exports = { getGenres }