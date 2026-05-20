import { searchController } from "../controllers/search.controller"
export const searchRouter = require('express').Router()

searchRouter.get('/search/multi', searchController)