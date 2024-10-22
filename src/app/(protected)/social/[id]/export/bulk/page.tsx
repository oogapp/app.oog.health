'use client'
import { ImportedVideosQuery } from "@/app/actions/ImportedVideosQuery"
import { Button } from "@/components/ui/button"
import { ImportedVideo } from "@/gql/graphql"
import { useGraphQL } from "@/lib/use-graphql"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function BulkExportPage({ params: { id } }) {

    const searchParams = useSearchParams()
    let ids = searchParams.get("ids")!.split(",")

    const { data, isLoading } = useGraphQL(
        "ImportedVideos",
        ImportedVideosQuery,
        {
            where: {
                idIn: ids
            }
        },
    )

    return (
        <div className="px-3 space-y-4">

            <div className="flex items-center justify-between">
                <div>
                    <Link href={`/social/${id}`}>
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                </div>
                <div>
                    Create Posts
                </div>
                <div></div>
            </div>

            <div>
                <Button>
                    Publish {ids.length} Videos
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-5">
                {data?.importedVideos?.edges?.map((edge) => {
                    let video = edge?.node as ImportedVideo
                    return (
                        <div key={video.id}>
                            <div>
                                <img
                                    className="w-full object-cover"
                                    src={`https://s3.amazonaws.com/${video?.bucket}/${video?.storageKey}/image.jpg`} />
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
