import { Request, Response } from "express";
import { getConfigs } from "../services/configs.service";

export const configsController = async (req: Request, res:Response) =>{
    try{
        const data = await getConfigs();
        res.json(data);
    } catch (e: unknown) {
        if(e instanceof Error){
            console.log(e.message);
        }
        res.status(500).json({error: "server error"})
    }
}