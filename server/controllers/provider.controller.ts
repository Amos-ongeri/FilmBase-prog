import { Request, Response } from "express";
import { getWatchProviders } from "../services/provider.service";
import { ProviderParams, ProvidersResponse } from "../types/provider.types";
import { ErrorResponse } from "../types/error.types";

export const providersController = async (req: Request<ProviderParams>, res: Response<ProvidersResponse | ErrorResponse>) => {
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