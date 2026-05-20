import { Request, Response } from "express";
import { getCredits } from "../services/credits.service";

type creditParams = {
    id: string
    media_type: string
}

export const creditsController = async (req: Request<creditParams>, res: Response): Promise<void> =>{
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