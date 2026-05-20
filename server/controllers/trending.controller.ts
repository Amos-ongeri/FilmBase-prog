import { Request, Response } from "express";
import { getTrending } from "../services/trending.service";
import { FilmResponse, TrendingParams } from "../types/film.types";
import { ErrorResponse } from "../types/error.types";

export const trendingController = async (req: Request<TrendingParams>, res: Response<FilmResponse | ErrorResponse>): Promise<void> =>{
    try{
        const { media_type,time_window } = req.params;
        const data = await getTrending(media_type,time_window)
        res.json(data)
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}