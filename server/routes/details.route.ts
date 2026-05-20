import { detailsController } from "../controllers/details.controller"

export const detailsRouter = require('express').Router()

detailsRouter.get('/:id/:media_type/details', detailsController)