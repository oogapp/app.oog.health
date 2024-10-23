'use client'
import { AccountConnection } from "@/gql/graphql";
import BulkImportButton from "./BulkImportButton";
import IgnoreVideosButton from "./IgnoreVideosButton";
import { useImportedVideos } from "./ImportedVideos";
import RefreshInstagram from "./RefreshInstagram";
import RefreshTiktok from "./RefreshTiktok";
import RefreshYoutube from "./RefreshYoutube";

export default function Toolbar({ conn }: { conn: AccountConnection }) {

    const { checkVideo, uncheckVideo, checkedVideos } = useImportedVideos()


    return (
        <div className="flex gap-x-2">

            {checkedVideos?.length == 0 && <>
                {conn.type == "instagram" && <RefreshInstagram connection={conn} />}
                {conn.type == "youtube" && <RefreshYoutube connection={conn} />}
                {conn.type == "tiktok" && <RefreshTiktok connection={conn} />}
            </>}

            {checkedVideos.length > 0 && <>
                <IgnoreVideosButton connection={conn} />
                <BulkImportButton connection={conn} />
            </>}
        </div>
    )
}
