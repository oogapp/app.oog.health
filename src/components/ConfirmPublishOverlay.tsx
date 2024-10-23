'use client'
import { createPostsFromImportedVideos } from "@/app/social-actions";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useImportedVideos } from "./ImportedVideos";
import { Button } from "./ui/button";

export default function ConfirmPublishOverlay() {

    const { showConfirmPublish, videosToPublish, cancelPublish, connection } = useImportedVideos()
    const [busy, setBusy] = useState(false)


    async function handlePublish() {
        setBusy(true)
        await createPostsFromImportedVideos(connection?.id!, videosToPublish)
        setBusy(false)
        cancelPublish()
    }

    if (!showConfirmPublish) return null

    return (
        <div className="absolute inset-0 backdrop-blur z-20 flex items-center justify-center">
            <div className="bg-black text-white p-5 rounded-xl space-y-4">
                <div>
                    You're about to publish {videosToPublish.length} video(s)!
                </div>
                <div className="gap-x-4 space-y-2">
                    <Button className="flex gap-x-2" disabled={busy} onClick={handlePublish}>
                        {busy && <Loader className="animate-spin" />}
                        Publish
                    </Button>
                    <Button
                        onClick={cancelPublish}
                        variant={'outline'}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}
