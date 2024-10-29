'use client'
import { AccountConnection } from "@/gql/graphql";
import BulkImportButton from "./BulkImportButton";
import IgnoreVideosButton from "./IgnoreVideosButton";
import { useImportedVideos } from "./ImportedVideos";
import RefreshInstagram from "./RefreshInstagram";
import RefreshTiktok from "./RefreshTiktok";
import RefreshYoutube from "./RefreshYoutube";
import { Input } from "./ui/input";

export default function Toolbar({ conn }: { conn: AccountConnection }) {

    const { search, setSearch, checkedVideos } = useImportedVideos()


    return (
        <div>

            {checkedVideos?.length == 0 && <div className="flex items-center gap-x-2">
                <div className="flex-1 w-full">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search" />
                </div>
                <div>
                    {conn.type == "instagram" && <RefreshInstagram connection={conn} />}
                    {conn.type == "youtube" && <RefreshYoutube connection={conn} />}
                    {conn.type == "tiktok" && <RefreshTiktok connection={conn} />}
                </div>
            </div>}

            {checkedVideos.length > 0 && <div className="flex items-center gap-x-4">
                <IgnoreVideosButton connection={conn} />
                <BulkImportButton connection={conn} />
            </div>}
        </div>
    )
}
