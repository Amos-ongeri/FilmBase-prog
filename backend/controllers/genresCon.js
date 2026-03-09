const { getGenres } = require("../services/genres")

const genresCon = async (req,res)=>{
    try{
        const { type } = req.params
        const data = await getGenres(type)        
        res.json(data)
    }catch(e){
        console.log('error: ', e.message);
        res.status(500).json({error: 'server error'})
    }
}

module.exports = { genresCon }