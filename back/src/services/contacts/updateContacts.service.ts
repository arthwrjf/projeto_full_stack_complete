import { Repository } from "typeorm";
import { TContactUpdateRequest, TContactUpdateResponse } from "../../interfaces/contact.interfaces";
import { Contact } from "../../entities/contact.entity";
import { AppDataSource } from "../../data-source";
import { contactSchemaUpdateRequest } from "../../schemas/contact.schemas";

const updateContactService = async (contactData: TContactUpdateRequest, contactId: number): Promise<TContactUpdateResponse> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const oldContactData = await contactRepository.findOneBy({id: contactId})

    const newContactData: Contact = contactRepository.create({
        ...oldContactData,
        ...contactData  
    })

    await contactRepository.save(newContactData)

    const returnContact: TContactUpdateResponse = contactSchemaUpdateRequest.parse(newContactData)

    return returnContact

}

export default updateContactService