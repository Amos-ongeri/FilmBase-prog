import { Request, Response } from "express";
import { getSimilar } from "../services/similar.service";

type similarParams = {
    id: string
    media_type: string
}

export const similarController = async (req: Request<similarParams>, res: Response): Promise<void> =>{
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