import { configsController } from "../controllers/configs.controller"

export const configsRouter = require('express').Router()

configsRouter.get("/configurations", configsController)