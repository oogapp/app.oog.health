import Instagram from "@/components/icons/Instagram"
import Tiktok from "@/components/icons/Tiktok"
import Youtube from "@/components/icons/Youtube"
import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/UserAvatar"
import { AccountConnection } from "@/gql/graphql"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { currentUser } from "../auth-actions"
import { getAccountConnections } from "../social-actions"

export default async function Index() {
    let user = await currentUser()
    let data = await getAccountConnections()
    return (
        <div>
            <div className="space-y-4 px-3">

                <div className="flex  items-start" >
                    <UserAvatar user={user} size="4xl" />
                    <div className="gap-x-4 flex flex-col text-center mx-4">
                        <div className="text-xl">{user?.firstName} {user?.lastName}</div>
                        <div className="font-thin text-sm">@{user?.username}</div>
                        <div className="font-thin text-sm">{user?.npiTaxonomyDescription}</div>
                    </div>
                </div>

                <div className="font-bold">
                    Connected Accounts ({data?.accountConnections?.totalCount})
                </div>

                <div>
                    <Button asChild>
                        <Link href={`/connect`}>
                            Connect an Account
                        </Link>
                    </Button>
                </div>

                <div className="divide-y divide-y-white">
                    {data?.accountConnections?.edges?.map((edge) => {
                        let connection = edge?.node as AccountConnection
                        let profilePictureUrl = connection?.profilePictureURL
                        return (
                            <Link prefetch={false} href={`/social/${connection.id}`} key={connection.id} className="block text-sm py-2 flex items-center gap-x-4">
                                <div>
                                    {profilePictureUrl &&
                                        <img
                                            className="w-12 h-12 rounded-full"
                                            src={profilePictureUrl} />
                                    }
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <div>@{connection.username}</div>
                                    {connection.type === "instagram" && <div className="text-white"><Instagram className={"h-4 w-4 invert"} /></div>}
                                    {connection.type === "tiktok" && <div><Tiktok className={"h-4 w-4 invert"} /></div>}
                                    {connection.type === "youtube" && <div><Youtube className={"h-4 w-4 invert"} /></div>}
                                </div>

                                <div className="ml-auto">
                                    <ChevronRight className="text-gray-400 w-4 h-4" />
                                </div>
                            </Link>
                        )
                    })}
                </div>

            </div>
        </div >
    )
}
