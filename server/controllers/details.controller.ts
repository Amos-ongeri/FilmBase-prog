import { Request, Response } from "express";
import { getDetails } from "../services/details.service";

type detailsParams = {
    id: string
    media_type: string
}

export const detailsController = async (req: Request<detailsParams>, res: Response): Promise<void> =>{
    try{
        const { id,media_type } = req.params;
        const data = await getDetails(id,media_type)
        res.json(data)
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}