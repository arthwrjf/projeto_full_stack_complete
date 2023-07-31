import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureContactIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.exist({where: {id: parseInt(request.params.id)}})

    if (!contact) {

        throw new AppError('contact not found', 404)

    }

    return next()

}

export default ensureContactIsValidMiddleware