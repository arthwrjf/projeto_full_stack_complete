import { Repository } from "typeorm";
import { TContactUser } from "../../interfaces/contact.interfaces";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { contactSchemaResponse } from "../../schemas/contact.schemas";



const retrieveContactService = async (userId: number): Promise<TContactUser> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({where:{id: userId}, relations:{contacts: true}})

    const contact  = contactSchemaResponse.parse(user)

    return contact



}
    
export default retrieveContactService