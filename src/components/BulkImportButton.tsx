'use client'
import { useImportedVideos } from "./ImportedVideos";
import { Button } from "./ui/button";

export default function BulkImportButton({ connection }) {
    const { checkVideo, uncheckVideo, checkedVideos, confirmPublish } = useImportedVideos()
    const ids = checkedVideos.join(",")
    const url = `/social/${connection?.id}/export/bulk?ids=${ids}`
    const handleConfirm = () => {
        confirmPublish(checkedVideos)
    }

    return (
        <div>
            <Button onClick={handleConfirm}>
                Publish {checkedVideos.length} Videos
            </Button>
        </div>
    );
}
