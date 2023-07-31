import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { User } from "../entities/user.entity"
import { AppDataSource } from "../data-source"
import { AppError } from "../error"

const ensureUserIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const userId = parseInt(request.params.id)

    const user = await userRepository.findOne({where: {id: userId}})

    if(!user) {

        throw new AppError('User not found',404)

    }

    return next()

}

export default ensureUserIsValidMiddleware