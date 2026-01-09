import { Router } from "express";
import usersController from '../controllers/users.controller.js'
import validation from "../middleware/validation.js";
const router = Router()

router 
    .post("api/register",validation,usersController.register)
    .post("api/register",validation,usersController.login)
    .get("api/users",validation,usersController.getUserAll)


export default router    




