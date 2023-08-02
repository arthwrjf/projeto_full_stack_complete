import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import { createContactsController, retrieveContactsController
    // deleteContactsController, updateContactsController 
} from "../controllers/contact.controllers";
import ensureContactIsValidMiddleware from "../middlewares/ensureContactIsValid.middlewares";

const contactRoutes: Router = Router()

contactRoutes.post('', ensureTokenIsValidMiddleware, createContactsController)
contactRoutes.get('/:id', ensureTokenIsValidMiddleware, retrieveContactsController)
// contactRoutes.patch('/:id', ensureTokenIsValidMiddleware, updateContactsController)
// contactRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureContactIsValidMiddleware, deleteContactsController)

export default contactRoutes


