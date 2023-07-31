import { Repository } from "typeorm"
import { TLogin } from "../../interfaces/login.interfaces"
import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config";
import process from "process";

const createLoginservice = async (loginData: TLogin): Promise<string> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({ emailPrincipal: loginData.email })

    if(!user) {

        throw new AppError ("Wrong email or password", 403)

    }

    const password = await compare(loginData.password, user.password)

    if(!password) {

        throw new AppError("Wrong email or password", 403)

    }

    const token: string = jwt.sign({ name: user.name }, process.env.SECRET_KEY!, {
        expiresIn: process.env.EXPIRES_IN,
        subject: String(user.id)
    })

    return token
}

export default createLoginservice