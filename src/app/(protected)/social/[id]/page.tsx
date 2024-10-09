import { getAccountConnection, getImportedVideos } from "@/app/social-actions"
import ExportAll from "@/components/ExportAll"
import ImportedVideoCell from "@/components/ImportedVideo"
import Poller from "@/components/Poller"
import RefreshInstagram from "@/components/RefreshInstagram"
import RefreshTiktok from "@/components/RefreshTiktok"
import RefreshYoutube from "@/components/RefreshYoutube"
import { AccountConnection, ImportedVideo } from "@/gql/graphql"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AccountConnectionPage({ params }) {

    let connData = await getAccountConnection(params.id)
    let conn = connData.node as AccountConnection
    let videoData = await getImportedVideos(params.id)

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-x-4">
                <div>
                    <Link href='/'>
                        <ArrowLeft />
                    </Link>
                </div>
                <div>
                    <div className="flex items-center gap-x-4">
                        <div>
                            {conn.profilePictureURL &&
                                <img
                                    className="w-12 h-12 rounded-full"
                                    src={conn.profilePictureURL} />
                            }
                        </div>
                        <div>
                            @{conn.username}
                            <div>
                                {conn.connectionStatus == 'connected' && <span className="text-green-600">Connected</span>}
                                {conn.connectionStatus == 'pending' && <span className="text-blue-600">Connecting...</span>}
                                {conn.connectionStatus == 'failed_to_connect' && <span className="text-red-600">Unable to Connect</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                <div className="flex gap-x-2">
                    {conn.type == "instagram" && <RefreshInstagram connection={conn} />}
                    {conn.type == "youtube" && <RefreshYoutube connection={conn} />}
                    {conn.type == "tiktok" && <RefreshTiktok connection={conn} />}
                    <ExportAll connection={conn} />
                </div>

                <div className="grid grid-cols-3 gap-5">
                    {videoData?.importedVideos?.edges?.map((edge) => {
                        let video = edge?.node as ImportedVideo
                        return (
                            <ImportedVideoCell key={video.id} video={video} />
                        )
                    })}
                </div>
            </div>
            <Poller />
        </div>
    )
}
