import { getImportedVideos } from "@/app/actions/get-videos"
import { currentUser } from "@/app/auth-actions"
import { getAccountConnection } from "@/app/social-actions"
import ConfirmPublishOverlay from "@/components/ConfirmPublishOverlay"
import Instagram from "@/components/icons/Instagram"
import Tiktok from "@/components/icons/Tiktok"
import Youtube from "@/components/icons/Youtube"
import ImportedVideos, { ImportedVideosProvider } from "@/components/ImportedVideos"
import Toolbar from "@/components/Toolbar"
import { AccountConnection } from "@/gql/graphql"
import { format, parseISO } from "date-fns"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function AccountConnectionPage({ params }) {

    let connData = await getAccountConnection(params.id)
    let conn = connData.node as AccountConnection
    let videoData = await getImportedVideos(params.id)
    let user = await currentUser()

    return (
        <ImportedVideosProvider connection={conn}>


            <ConfirmPublishOverlay />

            <div className="space-y-4 px-3">

                <div className="space-y-4 sticky top-0 z-10 bg-black">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <ChevronLeft className="w-6 h-6" />
                            </Link>
                        </div>
                        <div>
                            {conn.type == "tiktok" &&
                                <Link target="new" href={`https://tiktok.com/@${conn.username}`}>
                                    @{conn.username}
                                </Link>
                            }
                            {conn.type == "instagram" &&
                                <Link target="new" href={`https://instagram.com/${conn.username}`}>
                                    @{conn.username}
                                </Link>
                            }
                            {conn.type == "youtube" &&
                                <Link target="new" href={`https://youtube.com/@${conn.username}`}>
                                    {conn.username}
                                </Link>
                            }

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
                                        <div>Last Refreshed: {format(parseISO(conn.updatedAt), "Pp")}</div>
                                        <div>Total Published: {conn.totalPublished}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 pb-3">
                        <Toolbar conn={conn} />
                    </div>

                </div>

                <ImportedVideos accountConnectionID={conn.id} />

            </div>
        </ImportedVideosProvider>
    )
}
