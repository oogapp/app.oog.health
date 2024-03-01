import { z } from "zod"

export const loginFormSchema = z.object({
    phone: z.string({
        required_error: "Phone number is required",
    })
})

export const otpFormSchema = z.object({
    otp: z.string({
        required_error: "Verification code is required",
    })
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type OtpFormSchema = z.infer<typeof otpFormSchema>
