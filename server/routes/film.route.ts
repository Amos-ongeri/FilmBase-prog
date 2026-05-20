import { filmController } from "../controllers/film.controller"

export const filmRouter = require('express').Router()

filmRouter.get('/:media_type/:category/:page/list',filmController)
