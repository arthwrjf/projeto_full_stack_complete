import { Request, Response } from "express"
import { TContact } from "../interfaces/contact.interfaces"
import createContactService from "../services/contacts/createContacts.services"
import deleteContactService from "../services/contacts/deleteContacts.service"
import updateContactService from "../services/contacts/updateContacts.service"
import retrieveContactService from "../services/contacts/retrieveContacts.service"

const createContactsController = async(request: Request , response: Response): Promise<Response> => {

    const userId: number = request.user.id
    const contactData: TContact = request.body

    const newContact = await createContactService(userId, contactData)

    return response.status(201).json(newContact)
    
}

const retrieveContactsController = async(request: Request, response: Response): Promise<Response> => {

    const userId: number = parseInt(request.params.id)

    const contacts = await retrieveContactService(userId)

    return response.json(contacts)
    
}

const updateContactsController = async(request: Request, response: Response): Promise<Response> => {

    const contactData = request.body

    const contactId: number = parseInt(request.params.id)

    const newContactData = await updateContactService(contactData, contactId)

    return response.json(newContactData)

}

const deleteContactsController = async(request: Request, response: Response) => {

    const contact = deleteContactService(parseInt(request.params.id))

    return response.status(204).send()
    
}



export { createContactsController, retrieveContactsController}