import { discoverController } from "../controllers/discover.controller"

export const discoverRouter = require('express').Router()

discoverRouter.get('/discover/:type/:page', discoverController)