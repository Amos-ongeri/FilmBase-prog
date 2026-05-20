import { Request, Response } from "express";
import { getSimilar } from "../services/similar.service";
import { SimilarParams } from "../types/similar.types";
import { FilmResponse } from "../types/film.types";
import { ErrorResponse } from "../types/error.types";

export const similarController = async (req: Request<SimilarParams>, res: Response<FilmResponse | ErrorResponse>): Promise<void> =>{
    try{
        const { id,media_type } = req.params;
        const data = await getSimilar(id,media_type);
        res.json(data)
    }catch(e:unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}