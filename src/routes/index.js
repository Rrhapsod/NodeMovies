import { Router } from "express";
import usersRoutes from "../routes/users.routes.js";
import moviesRoutes from "./movies.routes.js";
import tagsRoutes from "./tags.routes.js";
import { sessionsRoutes } from "./sessions.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/sessions", sessionsRoutes);

export default routes;
