import { Request, Response } from "express";
import { getWatchProviders } from "../services/provider.service";

type providerParams = {
    media: string
    id: string
}

export const providersController = async (req: Request<providerParams>, res: Response) => {
    try{
        const {media, id} = req.params;
        const data = await getWatchProviders(media, id);

        res.json(data);
    } catch (e: unknown) {
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: "server error"});
    }
}