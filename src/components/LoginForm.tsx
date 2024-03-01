"use client";

import { sendPhoneOTP } from "@/app/auth-actions";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Submit } from "./ui/submit";

export default function LoginForm() {

    const [state, formAction] = useFormState(sendPhoneOTP, {})
    const { pending } = useFormStatus()

    return (
        <div>
            <form action={formAction} className="space-y-4">

                {state.success && <div className="text-green-600">Verification code sent</div>}

                <div className="">
                    <div className="space-y-2">
                        <Label>Enter your phone number</Label>
                        <Input className="border" name="phone" type="text" required />
                        <div className="text-red-600">{state?.errors?.phone}</div>
                    </div>
                </div>

                <Submit
                    size={'lg'}>
                    Send Verification Code {pending && <span className="animate-spin">🔄</span>}
                </Submit>
            </form>
        </div>
    )
}
