'use client'
import { ImportedVideosQuery } from '@/app/actions/ImportedVideosQuery'
import { AccountConnection, ImportedVideo } from "@/gql/graphql"
import { useGraphQL } from "@/lib/use-graphql"
import React, { useEffect } from 'react'
import ImportedVideoCell from "./ImportedVideo"

// create a useInterval hook
function useInterval(callback, delay) {
    const savedCallback = React.useRef<any>();

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

interface ImportedVideosContextType {
    connection: AccountConnection | null;
    videos: ImportedVideo[];
    videosToPublish: string[];
    checkedVideos: string[];
    showConfirmPublish: boolean;
    checkVideo: (videoID: string) => void;
    uncheckVideo: (videoID: string) => void;
    confirmPublish: (ids: string[]) => void;
    cancelPublish: () => void;
}

const initialState = {
    connection: null,
    videos: [],
    checkedVideos: [],
    videosToPublish: [],
    showConfirmPublish: false,
    checkVideo: (videoID: string) => { },
    uncheckVideo: (videoID: string) => { },
    confirmPublish: (ids: string[]) => { },
    cancelPublish: () => { },
};

export const ImportedVideosContext = React.createContext<ImportedVideosContextType>(initialState);

export function ImportedVideosProvider({ connection, children }: { connection: AccountConnection, children: React.ReactNode }) {

    const [checkedVideos, setCheckedVideos] = React.useState<string[]>([]);
    const [videosToPublish, setVideosToPublish] = React.useState<string[]>([]);
    const [showConfirmPublish, setShowConfirmPublish] = React.useState<boolean>(false);
    const [videos, setVideos] = React.useState<ImportedVideo[]>([]);

    const checkVideo = (videoID: string) => {
        setCheckedVideos([...checkedVideos, videoID]);
    }

    const uncheckVideo = (videoID: string) => {
        setCheckedVideos(checkedVideos.filter(id => id !== videoID));
    }

    const cancelPublish = () => {
        setShowConfirmPublish(false);
        setVideosToPublish([]);
        refetch();
    }

    const confirmPublish = (ids: string[]) => {
        // show confirm publish modal
        setVideosToPublish(ids);
        setShowConfirmPublish(true);
    }

    const { data, isLoading, refetch } = useGraphQL(
        "ImportedVideos",
        ImportedVideosQuery,
        {
            where: {
                hasAccountConnectionWith: [
                    {
                        id: connection.id
                    }
                ]
            }
        }
    )
    useEffect(() => {
        if (data) {
            let nodes = data?.importedVideos?.edges?.map((edge) => {
                return edge?.node! as ImportedVideo
            })
            setVideos(nodes!)
        }
    }, [data])

    useInterval(() => {
        refetch()
    }, 5000)


    return (
        <ImportedVideosContext.Provider value={{
            connection,
            checkedVideos,
            confirmPublish,
            checkVideo,
            uncheckVideo,
            showConfirmPublish,
            cancelPublish,
            videosToPublish,
            videos
        }}>
            {children}
        </ImportedVideosContext.Provider>
    )
}

export function useImportedVideos() {
    return React.useContext(ImportedVideosContext);
}

export default function ImportedVideos({ accountConnectionID }) {

    const { videos } = useImportedVideos()

    return (

        <div className='space-y-4'>
            {/*<div>
                <Input placeholder='Search Videos' />
            </div>*/}
            <div>
                <div className="grid grid-cols-2 gap-5">
                    {videos?.map((video) => {
                        return (
                            <ImportedVideoCell key={video.id} video={video} />
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
