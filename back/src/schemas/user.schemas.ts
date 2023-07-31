import { z } from "zod"

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    emailPrincipal: z.string().email(),
    emailSecondary: z.string(),
    password: z.string(),
    telephonePrincipal: z.string(),
    telephoneSecondary: z.string(),
    createdAt: z.date(),
})

const userSchemaRequest = userSchema.omit({ id: true, createdAt: true })

const userSchemaResponse = userSchema.omit({ password: true })

const usersSchemaResponse = z.array(userSchemaResponse)

const userSchemaUpdateRequest = userSchemaRequest.partial()

export { userSchema, userSchemaRequest, userSchemaResponse, usersSchemaResponse, userSchemaUpdateRequest }