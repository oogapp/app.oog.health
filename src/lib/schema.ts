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

export const exportPostSchema = z.object({
    videoID: z.string({
        required_error: "Video ID is required",
    }),
    body: z.string({
        required_error: "Body is required",
    }).min(5, "Body must be at least 5 characters")
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type OtpFormSchema = z.infer<typeof otpFormSchema>
export type ExportPostSchema = z.infer<typeof exportPostSchema>
