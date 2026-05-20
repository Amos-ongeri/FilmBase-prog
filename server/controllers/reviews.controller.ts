import { Request, Response } from "express";
import { getReviews } from "../services/reviews.service";

type reviewParams = {
    id: string
    media_type: string
}

export const reviewsController = async (req: Request<reviewParams>, res: Response): Promise<void> =>{
    try{
        const { id,media_type } = req.params;
        const data = await getReviews(id,media_type)
        res.json(data)
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}