import { Repository } from "typeorm"
import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"

const deleteUsersService = async (userId: number): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOne({where: {id: userId}})

    if(!user) {

        throw new AppError("user not found", 404)

    }

    await userRepository.remove(user)
}

export default deleteUsersService