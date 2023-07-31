import { z } from 'zod'
import { contactSchema, contactSchemaRequest, contactSchemaResponse, contactSchemaUpdateRequest, contactUserSchemaReponse } from '../schemas/contact.schemas'
import { DeepPartial } from 'typeorm'

type TContactRequest = z.infer<typeof contactSchemaRequest>
type TContact = z.infer<typeof contactSchema>
type TContactResponse = z.infer<typeof contactSchemaResponse>
type TContactUpdateRequest = DeepPartial<TContactRequest>
type TContactUser = z.infer<typeof contactSchemaResponse>
type TContactUpdateResponse = z.infer<typeof contactSchemaUpdateRequest>

export { TContactRequest, TContact, TContactResponse, TContactUpdateRequest, TContactUser, TContactUpdateResponse }