'use client'
import Link from "next/link";
import { useImportedVideos } from "./ImportedVideos";
import { Button } from "./ui/button";

export default function BulkImportButton({ connection }) {
    const { checkVideo, uncheckVideo, checkedVideos } = useImportedVideos()
    if (checkedVideos.length == 0) {
        return null
    }

    const ids = checkedVideos.join(",")
    const url = `/social/${connection?.id}/export/bulk?ids=${ids}`

    return (
        <div>
            <Button asChild>
                <Link href={url}>
                    Publish {checkedVideos.length} Videos
                </Link>
            </Button>
        </div>
    );
}
