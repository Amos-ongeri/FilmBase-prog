import { Request, Response } from "express";
import { getImages } from "../services/images.service";
import { ImageParams, ImageResponse } from "../types/image.types";
import { ErrorResponse } from "../types/error.types";

export const imagesController = async (req: Request<ImageParams>, res: Response<ImageResponse | ErrorResponse>): Promise<void> => {
    try{
        const { media_type, id } = req.params;
        const data = await getImages(media_type, id);

        res.json(data);
    } catch (e: unknown) {
        if(e instanceof Error){
            console.log(e.message);
        }

        res.status(500).json({error: "server error"});
    }
}