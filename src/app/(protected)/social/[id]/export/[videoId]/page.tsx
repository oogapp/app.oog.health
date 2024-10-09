import { getImportedVideo } from "@/app/social-actions"
import ExportForm from "@/components/ExportForm"
import { ImportedVideo, ImportedVideoExportStatus } from "@/gql/graphql"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import Link from "next/link"

export default async function ExportVideo({ params: { id, videoId } }) {
    let data = await getImportedVideo(videoId)
    let video = data.node as ImportedVideo
    return (
        <div>
            <div className="border-b py-2">
                <Link href={`/social/${id}`} className="flex items-center gap-x-1">
                    <ArrowLeft />
                    Back
                </Link>
            </div>
            <div className="h-96 flex items-center justify-center bg-black p-3 rounded-md">
                <img
                    className="h-full object-cover"
                    src={`https://s3.amazonaws.com/${video?.bucket}/${video?.storageKey}/image.jpg`} />
            </div>
            <div>
                {video?.exportStatus == ImportedVideoExportStatus.Processing &&
                    <div className="bg-blue-500 p-2 rounded-md flex items-center gap-x-2">
                        <Loader2 className="animate-spin" />
                        Exporting...
                    </div>
                }

                {video?.exportStatus == ImportedVideoExportStatus.Complete &&
                    <div className="bg-green-500 p-2 rounded-md flex items-center gap-x-2">
                        <Check />
                        Export Complete
                    </div>
                }

                {!video?.exportStatus &&
                    <ExportForm video={video} />
                }

            </div>
        </div>
    )
}
