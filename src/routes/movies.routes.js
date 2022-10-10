import { Router } from "express";
import MoviesController from "../controllers/MoviesController.js";

const moviesRoutes = Router();

const moviesController = new MoviesController();

moviesRoutes.get("/", moviesController.index);
moviesRoutes.post("/:user_id", moviesController.create);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.delete("/:id", moviesController.delete);

export default moviesRoutes;
