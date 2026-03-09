const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const tmdb = axios.create({
        baseURL : 'https://api.themoviedb.org/3',
        headers : {
            Authorization : `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
            'content-type': 'application/json',
        }
});

const getMovies = async (media_type,category)=>{
    try {
    const { data } = await tmdb.get(`/${media_type}/${category}`);
    return data;
  } catch (e) {
    throw e;
  }    
}

const getDetails = async (tmdb_id,media_type)=>{
    try{
    const {data} = await tmdb.get(`/${media_type}/${tmdb_id}`) 
    return data;
    }catch(e){
        throw e;
    }
}

const getVideos = async (id,media_type)=>{
  try{
    const {data} = await tmdb.get(`/${media_type}/${id}/videos`)
    return data;
  }catch(e){
    throw e;
  }
}

const getCredits = async (id,media_type)=>{
  try{
    const { data } = await tmdb.get(`/${media_type}/${id}/credits`)
    return data;
  }catch(e){
    throw e;
  }
}

const getSimilar = async (id,media_type)=>{
  try{
    const { data } = await tmdb.get(`/${media_type}/${id}/similar`)
    return data;
  }catch(e){
    throw e;
  }
}

const getGenres = async (type)=>{
  try{
    const { data } = await tmdb.get(`/genre/${type}/list`);
    return data
  }catch(e){
    throw e;
  }
}

const getReviews = async (id,media_type)=>{
  try{
    const { data } = await tmdb.get(`/${media_type}/${id}/reviews`)
    return data;
  }catch(e){
    throw e;
  }
}

const getTrending = async (media_type,time_window ) =>{
  try{
    const { data } = await tmdb.get(`/trending/${media_type}/${time_window}`)
    return data;
  }catch(e){
    console.log('error :',e.message);
    
    throw e;
  }
}

const getDiscover = async (type) => {
  try{
    const { data } = await tmdb.get(`/discover/${type}`)
    return data;
  }catch(e){
    console.log('error :',e.message);
    
    throw e;
  }
}

module.exports = { getMovies, getDetails, getVideos, getCredits, getSimilar, getGenres, getReviews, getTrending, getDiscover };