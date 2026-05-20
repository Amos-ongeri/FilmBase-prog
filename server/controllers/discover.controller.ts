import { Request, Response } from "express";
import { getDiscover } from "../services/discover.services";
import { DiscoverParams } from "../types/discover.types";
import { FilmResponse } from "../types/film.types";
import { ErrorResponse } from "../types/error.types";

export const discoverController = async (req: Request<DiscoverParams>, res: Response<FilmResponse | ErrorResponse>) => {
    try{
        const { type, page } = req.params

        const data = await getDiscover(type, page)
        res.json(data);
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}