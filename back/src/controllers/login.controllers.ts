import { Request, Response } from "express";
import { TLogin } from "../interfaces/login.interfaces";
import createLoginservice from "../services/login/createLogin.services";

const createLoginController = async(request: Request, response: Response): Promise<Response> => {

    const loginData: TLogin = request.body

    const token =  await createLoginservice(loginData)

    return response.json({ token: token })

}

export default createLoginController