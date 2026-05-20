import { Request, Response } from "express";
import { getGenres } from "../services/genre.service";
import { GenreParams, GenreResponse } from "../types/genre.types";
import { ErrorResponse } from "../types/error.types";

export  const genreController = async (req: Request<GenreParams>, res: Response<GenreResponse | ErrorResponse>):Promise<void> =>{
    try{
        const { type } = req.params
        const data = await getGenres(type)
        res.json(data)
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}