import { z } from "zod"
import { userSchemaResponse } from "./user.schemas"

const contactSchema = z.object({
    id: z.number(),
    name: z.string(),
    emailPrincipal: z.string().email(),
    emailSecondary: z.string(),
    telephonePrincipal: z.string(),
    telephoneSecondary: z.string(),
    createdAt: z.date(),
    user: userSchemaResponse
})

const contactSchemaRequest = contactSchema.omit({ id: true, createdAt: true, user: true })

const contactSchemaUpdateRequest = contactSchema.partial()

const contactUserSchemaReponse = z.array(contactSchema.omit({user: true}))

const contactSchemaResponse = userSchemaResponse.extend({contacts: contactUserSchemaReponse})


export { contactSchema, contactSchemaRequest, contactSchemaUpdateRequest, contactSchemaResponse, contactUserSchemaReponse }