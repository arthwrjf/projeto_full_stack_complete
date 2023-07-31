import { Repository } from "typeorm"
import { TUserResponse } from "../../interfaces/users.interfaces"
import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { userSchemaResponse } from "../../schemas/user.schemas"
import { AppError } from "../../error"

const retrieveUsersService = async (userId: number): Promise<TUserResponse> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOne({where: {id: userId}})

    if(!user) {

        throw new AppError("user not found", 404)

    }

    const returnUser =  userSchemaResponse.parse(user)

    return returnUser

}

export default retrieveUsersService