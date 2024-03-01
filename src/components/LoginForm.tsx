"use client";

import { sendPhoneOTP } from "@/app/actions";
import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function LoginForm() {

    const [state, formAction] = useFormState(sendPhoneOTP, {})

    return (

        <form action={formAction} className="space-y-4">

            {state.success && <div className="text-green-600">Verification code sent</div>}

            <div>
                <div>
                    <Label>Phone Number</Label>
                    <input className="h-10 border" name="phone" type="text" required />
                    <div className="text-red-600">{state?.errors?.phone}</div>
                </div>
            </div>

            <Button
                size={'lg'}>
                Send Verification Code
            </Button>
        </form>

    )
}
