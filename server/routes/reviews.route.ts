import { reviewsController } from "../controllers/reviews.controller"

export const reviewRouter = require('express').Router()

reviewRouter.get('/:id/:media_type/reviews', reviewsController)