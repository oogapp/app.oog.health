'use client'

import { ImportedVideo, ImportedVideoExportStatus } from "@/gql/graphql"
import { CheckCircleIcon, Loader2, PlusCircleIcon } from "lucide-react"
import Link from "next/link"

export default function ImportedVideoCell({ video }: { video: ImportedVideo }) {
    let postId = video?.exportedVideo?.post?.id
    let exported = postId != null
    let exportStatus = video.exportStatus!
    return (
        <div key={video.id} className="relative border border-black rounded-xl overflow-hidden">
            {exported && <div className="absolute text-xs bg-black/75 inset-0 flex flex-col items-start justify-start text-green-200">
                {video?.exportedVideo?.id &&
                    <div className="rounded-md bg-black/30 text-white p-2 m-2 gap-x-2 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 inline-block" />
                        Post Created
                    </div>
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

            {/*video?.title &&
                <div>
                    <div className="text-sm font-medium">{video.title}</div>
                </div>
            */}

            {!exported && exportStatus != ImportedVideoExportStatus.Processing &&
                <Link href={`/social/${video.accountConnectionID}/export/${video.id}`} className="text-sm items-center justify-center flex gap-x-2 absolute bottom-0 p-2 bg-gray-900 right-0 left-0">
                    <PlusCircleIcon className="w-4 h-4 inline-block" />
                    Create Post
                </Link>}
        </div>
    )
}
