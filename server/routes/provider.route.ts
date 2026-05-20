import { providersController } from "../controllers/provider.controller"

export const providerRouter = require('express').Router()

providerRouter.get("/:media/:id/providers", providersController)