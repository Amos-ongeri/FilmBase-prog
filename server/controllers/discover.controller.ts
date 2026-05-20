import { Request, Response } from "express";
import { getDiscover } from "../services/discover.services";

type discoverParams = {
    type: string
    page: string
}

export const discoverController = async (req: Request<discoverParams>, res: Response) => {
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