import { creditsController } from "../controllers/credits.controller"

export const creditsRouter = require('express').Router()

creditsRouter.get('/:id/:media_type/credits',creditsController)