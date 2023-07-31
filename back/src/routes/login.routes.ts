import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import createLoginController from "../controllers/login.controllers";
import { loginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router()

loginRoutes.post('', ensureDataIsValidMiddleware(loginSchema), createLoginController)

export default loginRoutes