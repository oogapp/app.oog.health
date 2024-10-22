'use client'
import { addConnection } from "@/app/social-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Submit } from "@/components/ui/submit";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";


export default function ConnectAccount() {

    const [state, formAction] = useFormState(addConnection, {})

    return (
        <div className="px-3 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                </div>
                <div>
                    Connect an Account
                </div>
                <div></div>
            </div>

            <div>
                <form action={formAction} className="space-y-6">

                    {state.success && <div className="text-green-600">Verification code sent</div>}

                    <div className="">
                        <div className="space-y-2">
                            <Input placeholder="Enter a username..." name="username" type="text" required />
                            <div className="text-red-600">{state?.errors?.username}</div>
                        </div>
                    </div>

                    <div>
                        <RadioGroup name="network" defaultValue="instagram">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="instagram" id="instagram" />
                                <Label htmlFor="instagram">Instagram</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="tiktok" id="tiktok" />
                                <Label htmlFor="tiktok">TikTok</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="youtube" id="youtube" />
                                <Label htmlFor="youtube">Youtube</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="">
                        <Submit>
                            Connect
                        </Submit>
                    </div>
                </form>
            </div>
        </div>
    )
}
