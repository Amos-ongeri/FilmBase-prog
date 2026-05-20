import { keywordController } from "../controllers/keywords.controller"
export const keywordsRouter = require('express').Router()

keywordsRouter.get('/search', keywordController)