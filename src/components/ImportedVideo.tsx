'use client'

import { ImportedVideo, ImportedVideoExportStatus } from "@/gql/graphql"
import { CheckCircleIcon, CheckSquareIcon, Loader2, PlusCircleIcon, Square } from "lucide-react"
import { useImportedVideos } from "./ImportedVideos"

export default function ImportedVideoCell({ video }: { video: ImportedVideo }) {
    let postId = video?.exportedVideo?.post?.id
    let exported = postId != null
    let exportStatus = video.exportStatus!
    let processing = ImportedVideoExportStatus.Processing == exportStatus

    const { checkVideo, uncheckVideo, checkedVideos, confirmPublish } = useImportedVideos()


    return (
        <div key={video.id} className="relative border border-black rounded-xl overflow-hidden">

            {exported && <div className="absolute text-xs bg-black/75 inset-0 flex flex-col items-start justify-start text-green-200">
                {video?.exportedVideo?.id &&
                    <div className="rounded-md bg-black/30 text-green-200 p-2 m-2 gap-x-2 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 inline-block" />
                        Post Created
                    </div>
                }
            </div>}

            {!exported && exportStatus != ImportedVideoExportStatus.Processing &&
                <div className="absolute right-0 top-0 bg-black rounded-md">

                    {checkedVideos.includes(video.id) ?
                        <CheckSquareIcon className="w-6 h-6 text-green-200" onClick={() => uncheckVideo(video.id)} />
                        :
                        <Square className="w-6 h-6 text-gray-200" onClick={() => checkVideo(video.id)} />
                    }

                </div>
            }

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
                <div
                    onClick={() => confirmPublish([video.id])}
                    className="text-sm items-center justify-center flex gap-x-2 absolute bottom-0 p-2 bg-gray-900 right-0 left-0">
                    <PlusCircleIcon className="w-4 h-4 inline-block" />
                    Create Post
                </div>}
        </div>
    )
}
