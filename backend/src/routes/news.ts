import { Router } from "express";
import { newsController } from "../controllers/newsController.js";

export const newsRouter = Router();

newsRouter.get("/:slug/:id", newsController.getNewsById);
