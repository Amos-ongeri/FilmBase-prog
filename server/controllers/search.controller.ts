import { Request, Response } from "express"
import { getSearchData } from "../services/search.service"

type searchQueries = {
    query: string
    page: string
}

export const searchController = async (req: Request<{},{},{},searchQueries>,res: Response)=>{
    try{
        const { query, page } = req.query
        const data = await getSearchData(query, page)
        res.json(data)
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}