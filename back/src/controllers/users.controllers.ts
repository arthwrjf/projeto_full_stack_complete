import { Request, Response } from "express";
import { TUserRequest, TUserResponse, TUsersUpdatedRequest } from "../interfaces/users.interfaces";
import createUsersService from "../services/users/createUsers.services";
import listUsersService from "../services/users/listUsers.services";
import retrieveUsersService from "../services/users/retrieveUsers.services";
import updateUsersService from "../services/users/updateUsers.services";
import deleteUsersService from "../services/users/deleteUsers.service";


const createUsersController = async(request: Request, response: Response): Promise<Response> => {

    const userData: TUserRequest = request.body

    const newUser = await createUsersService(userData)

    return response.status(201).json(newUser) 
    
}

const listUsersController = async(request: Request, response: Response): Promise<Response> => {

    const users = await listUsersService()

    return response.json(users)

}

const retrieveUsersController = async(request: Request, response: Response): Promise<Response> => {

    const userId: number = parseInt(request.params.id)

    const user: TUserResponse = await retrieveUsersService(userId)

    return response.json(user)
    
}

const updateUsersController = async(request: Request, response: Response): Promise<Response> => {

    const userData: TUsersUpdatedRequest = request.body

    const userId: number = parseInt(request.params.id)

    const newUserData: TUserResponse = await updateUsersService(userData, userId)

    return response.json(newUserData)

}

const deleteUsersController = async(request: Request, response: Response): Promise<Response> => {

    const userData = await deleteUsersService(parseInt(request.params.id))

    return response.status(204).send()
    
}

export { createUsersController, listUsersController, retrieveUsersController, updateUsersController, deleteUsersController }