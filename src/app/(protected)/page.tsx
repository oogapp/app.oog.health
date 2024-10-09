import SetupInstagramForm from "@/components/SetupInstagramForm"
import TestQuery from "@/components/TestQuery"
import { AccountConnection } from "@/gql/graphql"
import Link from "next/link"
import { currentUser } from "../auth-actions"
import { getAccountConnections } from "../social-actions"

export default async function Index() {
    let user = await currentUser()
    let data = await getAccountConnections()
    return (
        <div className="space-y-4">
            <div className="space-y-8">
                <div>
                    <SetupInstagramForm />
                </div>
                {/*<div>
                    <SetupYoutubeForm />
    </div>*/}

                <TestQuery />

                <div className="border border-white p-2 rounded-md space-y-4">
                    <div>
                        <div className="text-center text-sm font-medium">Your Connections</div>
                    </div>
                    <div className="divide-y divide-y-white">
                        {data?.accountConnections?.edges?.map((edge) => {
                            let connection = edge?.node as AccountConnection
                            let profilePictureUrl = connection?.profilePictureURL
                            return (
                                <Link prefetch={false} href={`/social/${connection.id}`} key={connection.id} className="block py-4 flex items-center gap-x-4">
                                    <div>
                                        {profilePictureUrl &&
                                            <img
                                                className="w-12 h-12 rounded-full"
                                                src={profilePictureUrl} />
                                        }
                                    </div>
                                    <div>
                                        <div>@{connection.username}</div>
                                        <div className="text-green-600 text-sm font-medium">
                                            {connection.type} -
                                            {connection.connectionStatus}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}
