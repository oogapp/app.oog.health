import { z } from "zod"

export const loginFormSchema = z.object({
    phone: z.string({
        required_error: "Phone number is required",
    })
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
