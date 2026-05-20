import { Request, Response } from "express";
import { getVideos } from "../services/videos.service";
import { VideosParams, VideosResponse } from "../types/video.types";
import { ErrorResponse } from "../types/error.types";

export const videosController = async (req: Request<VideosParams>, res: Response<VideosResponse | ErrorResponse>): Promise<void> =>{
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