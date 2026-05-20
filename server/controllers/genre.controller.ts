import { Request, Response } from "express";
import { getGenres } from "../services/genre.service";

type genreParams = {
    type: string
}

export  const genreController = async (req: Request<genreParams>, res: Response):Promise<void> =>{
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