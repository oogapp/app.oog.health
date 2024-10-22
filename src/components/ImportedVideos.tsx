'use client'
import { ImportedVideosQuery } from '@/app/actions/ImportedVideosQuery'
import { ImportedVideo } from "@/gql/graphql"
import { useGraphQL } from "@/lib/use-graphql"
import React from 'react'
import ImportedVideoCell from "./ImportedVideo"

// generate a simple react context to track checked videos
// and provide a way to check/uncheck them

interface ImportedVideosContextType {
    checkedVideos: string[];
    checkVideo: (videoID: string) => void;
    uncheckVideo: (videoID: string) => void;
}

const initialState = {
    checkedVideos: [],
    checkVideo: (videoID: string) => { },
    uncheckVideo: (videoID: string) => { },
};

export const ImportedVideosContext = React.createContext<ImportedVideosContextType>(initialState);

export function ImportedVideosProvider(props: any) {
    const [checkedVideos, setCheckedVideos] = React.useState<string[]>([]);

    const checkVideo = (videoID: string) => {
        setCheckedVideos([...checkedVideos, videoID]);
    }

    const uncheckVideo = (videoID: string) => {
        setCheckedVideos(checkedVideos.filter(id => id !== videoID));
    }

    return (
        <ImportedVideosContext.Provider value={{
            checkedVideos,
            checkVideo,
            uncheckVideo,
        }}>
            {props.children}
        </ImportedVideosContext.Provider>
    )
}

export function useImportedVideos() {
    return React.useContext(ImportedVideosContext);
}

export default function ImportedVideos({ accountConnectionID }) {

    const { data, isLoading } = useGraphQL(
        "ImportedVideos",
        ImportedVideosQuery,
        {
            where: {
                hasAccountConnectionWith: [
                    {
                        id: accountConnectionID
                    }
                ]
            }
        },
    )

    return (

        <div className='space-y-4'>
            {/*<div>
                <Input placeholder='Search Videos' />
            </div>*/}
            <div>
                <div className="grid grid-cols-2 gap-5">
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
