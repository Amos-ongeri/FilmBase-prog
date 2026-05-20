import { trendingController } from "../controllers/trending.controller"

export const trendingRouter = require('express').Router()

trendingRouter.get('/:media_type/:time_window/trending', trendingController)