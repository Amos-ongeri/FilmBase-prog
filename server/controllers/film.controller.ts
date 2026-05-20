import { Request, Response } from "express";
import { getFilm } from "../services/film.service";
import { FilmParams, FilmResponse } from "../types/film.types";
import { ErrorResponse } from "../types/error.types";

export const filmController = async (req: Request<FilmParams>, res: Response<FilmResponse | ErrorResponse>): Promise<void> =>{
    try{
        const { media_type, category, page } = req.params;
        const data = await getFilm(media_type,category,page)
        res.json(data);
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({ error: "server error" });
    }
}