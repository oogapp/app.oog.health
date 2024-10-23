'use client'
import Link from "next/link";
import { useImportedVideos } from "./ImportedVideos";
import { Button } from "./ui/button";

export default function IgnoreVideosButton({ connection }) {
    const { checkVideo, uncheckVideo, checkedVideos } = useImportedVideos()
    const ids = checkedVideos.join(",")
    const url = `/social/${connection?.id}/export/bulk?ids=${ids}`

    return (
        <div>
            <Button variant={'outline'} asChild>
                <Link href={url}>
                    Ignore {checkedVideos.length} Videos
                </Link>
            </Button>
        </div>
    );
}
