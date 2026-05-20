import { Request, Response } from "express";
import { getReviews } from "../services/reviews.service";
import { ReviewParams, ReviewsResponse } from "../types/reviews.types";
import { ErrorResponse } from "../types/error.types";

export const reviewsController = async (req: Request<ReviewParams>, res: Response<ReviewsResponse | ErrorResponse>): Promise<void> =>{
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