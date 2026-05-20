import { Request, Response } from "express";
import { getVideos } from "../services/videos.service";

type videosParams = {
    id: string
    media_type: string
}

export const videosController = async (req: Request<videosParams>, res: Response): Promise<void> =>{
    try{
        const { id,media_type } = req.params;
        const data = await getVideos(id,media_type);
        res.json(data)
    }catch(e: unknown){
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: 'server error'})
    }
}