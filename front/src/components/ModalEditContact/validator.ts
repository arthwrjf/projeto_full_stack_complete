import {z} from "zod"

export const schema = z. object({
    name: z.string(),
    emailPrincipal: z.string(),
    emailSecondary: z.string().optional(),
    telephonePrincipal: z.string(),
    telephoneSecondary: z.string().optional(),
})

export type EditContactData = z.infer<typeof schema>