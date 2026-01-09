import { Router } from "express";
import validation from "../middleware/validation.js";
import usersController from "../controllers/users.controller.js";
const router = Router();

router
  .post("/api/register", validation.register, usersController.register)
  .post("/api/login", usersController.login)

  .get("/api/allUser", usersController.getAllUser);

export default router;
