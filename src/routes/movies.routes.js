import { Router } from "express";
import MoviesController from "../controllers/MoviesController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const moviesRoutes = Router();

const moviesController = new MoviesController();

moviesRoutes.use(ensureAuthenticated)

moviesRoutes.get("/", moviesController.index);
moviesRoutes.post("/", moviesController.create);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.delete("/:id", moviesController.delete);

export default moviesRoutes;
