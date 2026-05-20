import { genreController } from "../controllers/genre.controller"

export const genreRouter = require('express').Router()

genreRouter.get('/:type/genres', genreController)