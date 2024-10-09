'use client'

import { ImportedVideo, ImportedVideoExportStatus } from "@/gql/graphql"
import { Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export default function ImportedVideoCell({ video }: { video: ImportedVideo }) {
    let postId = video?.exportedVideo?.post?.id
    let exported = postId != null
    let exportStatus = video.exportStatus!
    return (
        <div key={video.id} className="relative">
            {exported && <div className="absolute text-xs bg-black/75 inset-0 flex flex-col items-center justify-center text-green-200">
                {video?.exportedVideo?.id &&
                    <>
                        Exported to post
                        <Check />
                    </>
                }
            </div>}
            <img
                className="w-full object-cover"
                src={`https://s3.amazonaws.com/${video?.bucket}/${video?.storageKey}/image.jpg`} />

            {!exported && exportStatus == ImportedVideoExportStatus.Processing &&
                <div className="text-xs absolute flex flex-col p-2 bg-black/75 inset-0 items-center justify-center text-blue-200">
                    Exporting to Post...
                    <Loader2 className="animate-spin" />
                </div>}

            {video?.title &&
                <div>
                    <div className="text-sm font-medium">{video.title}</div>
                </div>
            }

            {!exported && exportStatus != ImportedVideoExportStatus.Processing &&
                <div className="text-xs absolute bottom-0 p-2 bg-black/50 right-0 left-0">
                    <Button
                        asChild
                        disabled={false}>
                        <Link href={`/social/${video.accountConnectionID}/export/${video.id}`}>
                            Create Post
                        </Link>
                    </Button>
                </div>}
        </div>
    )
}
