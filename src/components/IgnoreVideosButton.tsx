'use client'
import { ignoreVideos } from "@/app/social-actions";
import { useImportedVideos } from "./ImportedVideos";
import { Button } from "./ui/button";

export default function IgnoreVideosButton({ connection }) {
    const { checkVideo, uncheckVideo, checkedVideos, refetch, } = useImportedVideos()
    const ids = checkedVideos.join(",")
    const url = `/social/${connection?.id}/export/bulk?ids=${ids}`

    async function handleIgnore() {
        console.log('Ignoring videos', checkedVideos)
        await ignoreVideos(connection?.id!, checkedVideos)
        refetch
    }

    return (
        <div>
            <Button onClick={handleIgnore} variant={'outline'}>
                Ignore {checkedVideos.length} Videos
            </Button>
        </div>
    );
}
