"use client";

import { sendPhoneOTP } from "@/app/auth-actions";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Submit } from "./ui/submit";

export default function LoginForm() {

    const [state, formAction] = useFormState(sendPhoneOTP, {})
    const [phone, setPhone] = useState('' as string)
    const { pending } = useFormStatus()

    return (
        <div>
            <form action={formAction} className="space-y-2">
                <input type="hidden" name="phone" value={phone} />

                {state.success && <div className="text-green-600">Verification code sent</div>}

                <div className="">
                    <div className="space-y-2">
                        <PhoneInput
                            numberInputProps={{
                                className: "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            }}
                            className='w-full'
                            placeholder="Cell Phone Number"
                            defaultCountry="US"
                            onChange={(e: any) => {
                                setPhone(e)
                            }} />
                        <div className="text-red-600">{state?.errors?.phone}</div>
                    </div>
                </div>

                <Submit
                    className="w-full">
                    Send Code {pending && <span className="animate-spin">🔄</span>}
                </Submit>
            </form>
        </div>
    )
}
