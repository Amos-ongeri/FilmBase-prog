import { similarController } from "../controllers/similar.controller"

export const similarRouter = require('express').Router()

similarRouter.get('/:id/:media_type/similar',similarController)