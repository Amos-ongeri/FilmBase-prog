import { imagesController } from "../controllers/images.controller"

export const imagesRouter = require('express').Router()

imagesRouter.get('/:media_type/:id/images', imagesController)