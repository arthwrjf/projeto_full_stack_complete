import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../error";

const ensureTokenIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    let token = request.headers.authorization

    if(!token) {

        throw new AppError('Missing bearer token', 401)

    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY! , (err, decoded:any) => {

        if(err) {

            throw new AppError(err.message,401)

        }

        request.user = {
            id: Number(decoded.sub),
            telephonePrincipal: decoded.telephonePrincipal,
        }

        return next()

    })

}

export default ensureTokenIsValidMiddleware