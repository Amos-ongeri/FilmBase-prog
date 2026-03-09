const { getKeywords } = require("../services/keywords")

const keywordCon = async (req,res)=>{
    try{
        const { query } = req.query
        const data = await getKeywords(query)        
        res.json(data)
    }catch(e){
        console.log('error: ', e.message);
        res.status(500).json({error: 'server error'})
    }
}

module.exports = { keywordCon }