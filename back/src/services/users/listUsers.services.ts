import { Repository } from "typeorm"
import { TUsersResponse } from "../../interfaces/users.interfaces"
import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { usersSchemaResponse } from "../../schemas/user.schemas"

const listUsersService = async (): Promise<TUsersResponse> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const users =  await userRepository.find()

    const returnUsers: TUsersResponse = usersSchemaResponse.parse(users)

    return returnUsers
}

export default listUsersService