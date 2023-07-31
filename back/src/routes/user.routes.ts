import { Router } from "express";
import { createUsersController, deleteUsersController, listUsersController, retrieveUsersController, updateUsersController } from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { userSchemaRequest, userSchemaUpdateRequest } from "../schemas/user.schemas";
import ensureUserIsValidMiddleware from "../middlewares/ensureUserIsValid.middlewares";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureEmailAlreadyExistMiddleware from "../middlewares/ensureEmailAlreadyExist.middlewares";

const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(userSchemaRequest), ensureEmailAlreadyExistMiddleware, createUsersController)
userRoutes.get('', ensureTokenIsValidMiddleware, listUsersController)
userRoutes.get('/:id', ensureTokenIsValidMiddleware, retrieveUsersController)
userRoutes.patch('/:id', ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(userSchemaUpdateRequest), ensureUserIsValidMiddleware, updateUsersController)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureUserIsValidMiddleware, deleteUsersController)

export default userRoutes