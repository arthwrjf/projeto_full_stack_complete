import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureEmailAlreadyExistMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUserByEmail: User | null = await userRepository.findOneBy({emailPrincipal: request.body.emailPrincipal})

    if(findUserByEmail){

        throw new AppError("Email already exists", 409)
    }

    return next()
}


export default ensureEmailAlreadyExistMiddleware