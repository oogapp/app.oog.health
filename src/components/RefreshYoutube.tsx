'use client'

import { refreshYoutubeConnection } from "@/app/social-actions"
import { AccountConnection, AccountConnectionImportStatus } from "@/gql/graphql"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

export default function RefreshYoutube({ connection }: { connection: AccountConnection }) {
    if (connection.importStatus == AccountConnectionImportStatus.Running) {
        return (
            <div className="bg-blue-500 p-2 rounded-md flex items-center gap-x-2">
                <Loader2 className="animate-spin" />
                Importing...
            </div>
        )
    }
    return (
        <Button onClick={() => {
            refreshYoutubeConnection(connection.id)
        }}>
            Refresh Youtube
        </Button>
    )
}
