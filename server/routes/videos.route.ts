import { videosController } from "../controllers/videos.controller"

export const videoRouter = require('express').Router()

videoRouter.get('/:id/:media_type/videos',videosController)