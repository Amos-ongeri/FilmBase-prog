import { Request, Response } from "express"
import { getSearchData } from "../services/search.service"
import { SearchQueries } from "../types/search.types"
import { FilmResponse } from "../types/film.types"
import { ErrorResponse } from "../types/error.types"

export const searchController = async (req: Request<{},{},{},SearchQueries>,res: Response<FilmResponse | ErrorResponse>)=>{
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