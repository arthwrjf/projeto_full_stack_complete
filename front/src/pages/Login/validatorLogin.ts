import {z} from "zod"

export const schema = z.object({
    email: z.string().email("Preencha o campo corretamente"),
    password: z.string().nonempty("senha invalida")
})

export type LoginData = z.infer<typeof schema>