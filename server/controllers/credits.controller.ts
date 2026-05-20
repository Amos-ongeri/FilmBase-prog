import { Request, Response } from "express";
import { getCredits } from "../services/credits.service";
import { CreditParams, CreditsResponse } from "../types/credit.types";
import { ErrorResponse } from "../types/error.types";

export const creditsController = async (req: Request<CreditParams>, res: Response<CreditsResponse | ErrorResponse>): Promise<void> =>{
    try{
        const { id,media_type } = req.params;
        const data = await getCredits(id,media_type)
        res.json(data)
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}