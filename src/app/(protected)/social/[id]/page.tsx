import { getImportedVideos } from "@/app/actions/get-videos"
import { currentUser } from "@/app/auth-actions"
import { getAccountConnection } from "@/app/social-actions"
import Instagram from "@/components/icons/Instagram"
import Tiktok from "@/components/icons/Tiktok"
import Youtube from "@/components/icons/Youtube"
import ImportedVideoCell from "@/components/ImportedVideo"
import Poller from "@/components/Poller"
import RefreshInstagram from "@/components/RefreshInstagram"
import RefreshTiktok from "@/components/RefreshTiktok"
import RefreshYoutube from "@/components/RefreshYoutube"
import { AccountConnection, ImportedVideo } from "@/gql/graphql"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function AccountConnectionPage({ params }) {

    let connData = await getAccountConnection(params.id)
    let conn = connData.node as AccountConnection
    let videoData = await getImportedVideos(params.id)
    let user = await currentUser()

    return (
        <div className="space-y-8 px-3">

            <div className="flex items-center justify-between">
                <div>
                    <Link href="/">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                </div>
                <div>
                    @{conn.username}
                </div>
                <div></div>
            </div>

            <div className="flex items-center gap-x-4">
                <div>
                    <div className="flex items-start gap-x-4">
                        <div>
                            {conn.profilePictureURL &&
                                <img
                                    className="w-24 h-24 rounded-full"
                                    src={conn.profilePictureURL} />
                            }
                        </div>
                        <div className="space-y-2">
                            <div>
                                {conn.type === "instagram" && <div className="flex items-center gap-x-2"><Instagram className={"h-4 w-4 invert"} /> Instagram</div>}
                                {conn.type === "tiktok" && <div className="flex items-center gap-x-2 text-sm"><Tiktok className={"h-4 w-4 invert"} /> Tiktok</div>}
                                {conn.type === "youtube" && <div className="flex items-center gap-x-2"><Youtube className={"h-4 w-4 invert"} /> Youtube</div>}
                            </div>
                            <div className="text-xs text-gray-400 space-y-1">
                                <div>(n) posts created from account</div>
                                <div>Refreshed: (date)</div>
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
                </div>

                <div className="grid grid-cols-2 gap-5">
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
