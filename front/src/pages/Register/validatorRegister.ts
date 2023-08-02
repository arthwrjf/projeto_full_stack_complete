import {z} from "zod"

export const schema = z. object({
    name: z.string().nonempty("preencha o campo corretamente"),
    emailPrincipal: z.string().email("Preencha o campo corretamente"),
    emailSecondary: z.string().optional(),
    password: z.string().nonempty("senha invalida"),
    telephonePrincipal: z.string().nonempty("Preencha o campo corretamente"),
    telephoneSecondary: z.string().optional(),
})

export type RegisterData = z.infer<typeof schema>