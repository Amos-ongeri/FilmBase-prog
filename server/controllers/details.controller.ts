import { Request, Response } from "express";
import { getDetails } from "../services/details.service";
import { DetailsParams, DetailsResponse } from "../types/details.types";
import { ErrorResponse } from "../types/error.types";

export const detailsController = async (req: Request<DetailsParams>, res: Response<DetailsResponse | ErrorResponse>): Promise<void> =>{
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