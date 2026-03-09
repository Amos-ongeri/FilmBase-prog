const {getMovies, getGenres, getDetails, getVideos, getCredits, getSimilar, getReviews, getTrending, getDiscover} = require('../services/services')

const moviesCon = async (req, res)=>{
    try{
        const { media_type,category } = req.params;
        const data = await getMovies(media_type,category) 
        res.json(data);
    }catch(e){
        console.error("Error in titleCon:", e.message);
    res.status(500).json({ error: "Failed to fetch titles" });
    }
}

const detailsCon = async (req, res)=>{
    try{
        const { id,media_type } = req.params;
        const data = await getDetails(id,media_type)
        res.json(data) 
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'server error'})
    }
}

const videosCon = async (req, res)=>{
    try{
        const { id,media_type } = req.params;
        const data = await getVideos(id,media_type);
        res.json(data)
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'server error'})
    }
}

const creditsCon = async (req,res)=>{
    try{
        const { id,media_type } = req.params;
        const data = await getCredits(id,media_type)
        res.json(data)
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'server error'})
    }
}

const similarCon = async (req,res)=>{
    try{
        const { id,media_type } = req.params;
        const data = await getSimilar(id,media_type);
        res.json(data)
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'server error'})
    }
}

const genreCon = async (req, res)=>{
    try{
        const { type } = req.params
        const data = await getGenres(type)
        res.json(data)
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'server error'})
    }
}

const reviewsCon = async (req, res)=>{
    try{
        const { id,media_type } = req.params;
        const data = await getReviews(id,media_type)
        res.json(data)
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'server error'})
    }
}

const trendingCon = async (req,res)=>{
    try{
        const { media_type,time_window } = req.params;
        const data = await getTrending(media_type,time_window)
        res.json(data)
    }catch(e){
        console.log('error:', e.message);
        res.status(500).json({error: 'server error'})        
    }
}

const discoverCon = async (req, res) => {
    try{
        const { type } = req.params
        const data = await getDiscover(type)      
        res.json(data);
    }catch(e){
        console.log('error:', e.message);
        res.status(500).json({error: 'server error'})  
    }
}

module.exports = { moviesCon, detailsCon, videosCon, creditsCon, similarCon, genreCon, reviewsCon, trendingCon, discoverCon}