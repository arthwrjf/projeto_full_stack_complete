import { z } from 'zod'
import { userSchema, userSchemaRequest, userSchemaResponse, usersSchemaResponse } from '../schemas/user.schemas'
import { DeepPartial } from 'typeorm'

type TUserRequest = z.infer<typeof userSchemaRequest>
type TUser = z.infer<typeof userSchema>
type TUserResponse = z.infer<typeof userSchemaResponse>
type TUsersResponse = z.infer<typeof usersSchemaResponse>
type TUsersUpdatedRequest = DeepPartial<TUserRequest>

export { TUserRequest, TUser, TUserResponse, TUsersResponse, TUsersUpdatedRequest }