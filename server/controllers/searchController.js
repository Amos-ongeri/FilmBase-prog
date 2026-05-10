const { getSearchData } = require('../services/search')

const searchCon = async (req,res)=>{
    try{
        const { query, page } = req.query
        const data = await getSearchData(query, page)
        res.json(data)
    }catch(e){
        console.log('error: ',e.message);
        res.status(500).json({error: 'server error'})
    }
}

module.exports = { searchCon }