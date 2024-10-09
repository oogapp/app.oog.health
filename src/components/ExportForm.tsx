'use client'

import { createPostFromImportedVideo } from "@/app/social-actions"
import { ImportedVideo } from "@/gql/graphql"
import { useFormState } from "react-dom"
import { Input } from "./ui/input"
import { Submit } from "./ui/submit"
import { Textarea } from "./ui/textarea"

export default function ExportForm({ video }: { video: ImportedVideo }) {
    if (!video) return (<div></div>)
    const [state, formAction] = useFormState(createPostFromImportedVideo, {
        success: false,
        message: ''
    })
    return (
        <div>
            <div>
                <div>
                    {state.success === true && <div className="text-green-600 bg-green-50 rounded-md p-2">{state.message}</div>}
                    {(state.success === false && state.message != "") && <div className="text-red-600 bg-red-50 rounded-md p-2">{state.message}</div>}
                </div>
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="videoID" value={video.id} />
                    <div>
                        <Input name="title" defaultValue={video.title!} placeholder="Enter your post title here" />
                    </div>
                    <div>
                        <Textarea name="body" defaultValue={video.body!} placeholder="Enter the body of your post here" />
                    </div>
                    <div>
                        <Submit>Export Post</Submit>
                    </div>
                </form>

            </div>
        </div>
    )
}
