import { Router } from "express";
import usersRoutes from "../routes/users.routes.js";
import moviesRoutes from "./movies.routes.js";
import tagsRoutes from "./tags.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);
routes.use("/tags", tagsRoutes);

export default routes;
