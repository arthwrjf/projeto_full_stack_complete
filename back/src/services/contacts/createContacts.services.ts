import { DeepPartial, Repository, getRepository } from "typeorm";
import { TContact, TContactRequest, TContactResponse } from "../../interfaces/contact.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { contactSchema } from "../../schemas/contact.schemas";
import { AppError } from "../../error";


const createContactService = async (userId: number, contactData: TContact): Promise<TContact> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const user: User | null = await userRepository.findOneBy({ id: userId })

    const contact: Contact = contactRepository.create({...contactData, user: user!})

    await contactRepository.save(contact)

    const returnContact = contactSchema.parse(contact)

    return returnContact

}

export default createContactService