const { tmdbClient } = require('../api/client');
const client = new tmdbClient();

const getMovies = async (media_type,category)=>{
    const movies = await client.request(`/${media_type}/${category}`);
    return movies;
}

const getDetails = async (tmdb_id,media_type)=>{
    const details = await client.request(`/${media_type}/${tmdb_id}`) 
    return details;
}

const getVideos = async (id,media_type)=>{
    const videos = await client.request(`/${media_type}/${id}/videos`)
    return videos;
}

const getCredits = async (id,media_type)=>{
    const credits = await client.request(`/${media_type}/${id}/credits`)
    return credits;
}

const getSimilar = async (id,media_type)=>{
    const recommended = await client.request(`/${media_type}/${id}/similar`)
    return recommended;
}

const getGenres = async (type)=>{
    const genres = await client.request(`/genre/${type}/list`);
    return genres
}

const getReviews = async (id,media_type)=>{
    const reviews = await client.request(`/${media_type}/${id}/reviews`)
    return reviews;
}

const getTrending = async (media_type,time_window ) =>{
    const trending = await client.request(`/trending/${media_type}/${time_window}`)
    return trending;
}

const getDiscover = async (type,sort_value) => {
    const discover = await client.request(`/discover/${type}${sort_value ? `?sort_by=${sort_value}`: ''}`)
    return discover;
}

module.exports = { getMovies, getDetails, getVideos, getCredits, getSimilar, getGenres, getReviews, getTrending, getDiscover };