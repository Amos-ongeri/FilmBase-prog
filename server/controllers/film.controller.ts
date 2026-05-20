import { Request, Response } from "express";
import { getFilm } from "../services/film.service";

type filmParams = {
    media_type: string
    category: string
    page: string
}

export const filmController = async (req: Request<filmParams>, res: Response): Promise<void> =>{
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