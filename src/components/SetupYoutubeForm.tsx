'use client'
import { createYoutubeConnection } from "@/app/social-actions"
import { useFormState } from "react-dom"
import { Input } from "./ui/input"
import { Submit } from "./ui/submit"

export default function SetupYoutubeForm({ }) {
    const [state, formAction] = useFormState(createYoutubeConnection, {})
    return (
        <div className="space-y-4 border border-white rounded-md p-2">
            <div className="text-sm font-medium text-center">
                Connect a Youtube channel
            </div>
            <div>
                <form action={formAction} className="space-y-2">

                    <div className="">
                        <div className="space-y-2">
                            <Input placeholder="Enter a username..." name="username" type="text" required />
                            <div className="text-red-600">{state?.errors?.username}</div>
                        </div>
                    </div>

                    <Submit>
                        Next
                    </Submit>
                </form>
            </div>
        </div>
    )
}
