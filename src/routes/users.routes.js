import { Router } from "express";
import UsersController from "../controllers/UsersController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import multer from "multer";
import { MULTER } from "../configs/upload.js";
import { UserAvatarController } from "../controllers/UserAvatarController.js";

const usersRoutes = Router();

const upload = multer(MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/", ensureAuthenticated, usersController.delete);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRoutes;
