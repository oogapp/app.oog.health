'use client'
import { verifyPhoneOTP } from "@/app/auth-actions"
import { useFormState } from "react-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Submit } from "./ui/submit"

export default function VerifyForm({ phone }) {
    const [state, formAction] = useFormState(verifyPhoneOTP, {})
    return (
        <div className="space-y-4">
            <div>
                <form action={formAction} className="space-y-2">

                    {state.success && <div className="text-green-600">Verification code sent</div>}

                    <div className="">
                        <div className="space-y-2">
                            <Input placeholder="Enter verification code" name="otp" type="text" required />
                            <div className="text-red-600">{state?.errors?.otp}</div>
                        </div>
                    </div>

                    <Submit>
                        Next
                    </Submit>

                </form>
            </div>
            <Button variant={'outline'}>Resend Code</Button>
        </div>
    )
}
