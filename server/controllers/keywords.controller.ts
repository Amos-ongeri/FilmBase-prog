import { Request, Response } from "express"
import { getKeywords } from "../services/keywords.service"
import { KeywordResponse } from "../types/keyword.types"
import { ErrorResponse } from "../types/error.types"

export const keywordController = async (req:Request ,res: Response<KeywordResponse | ErrorResponse>): Promise<void> =>{
    try{
        const query  = req.query.query as string
        const data = await getKeywords(query)
        res.json(data)
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}
