'use client'
import { ImportedVideosQuery } from '@/app/actions/ImportedVideosQuery'
import { ImportedVideo } from "@/gql/graphql"
import { useGraphQL } from "@/lib/use-graphql"
import ImportedVideoCell from "./ImportedVideo"
import { Input } from './ui/input'

export default function ImportedVideos() {
    //let videoData = await getImportedVideos()

    const { data, isLoading } = useGraphQL(
        "ImportedVideos",
        ImportedVideosQuery,
        {},
    )

    return (
        <div>
            <div className='p-2'>
                <Input placeholder='Search Videos' />
            </div>
            <div>
                <div className="grid grid-cols-3">
                    {data?.importedVideos?.edges?.map((edge) => {
                        let video = edge?.node as ImportedVideo
                        return (
                            <ImportedVideoCell key={video.id} video={video} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
