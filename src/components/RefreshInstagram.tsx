'use client'

import { refreshInstagramConnection } from "@/app/social-actions"
import { AccountConnection, AccountConnectionExportStatus, AccountConnectionImportStatus } from "@/gql/graphql"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

export default function RefreshInstagram({ connection }: { connection: AccountConnection }) {
    if (connection.importStatus == AccountConnectionImportStatus.Running) {
        return (
            <div className="bg-blue-500 p-2 rounded-md flex items-center gap-x-2">
                <Loader2 className="animate-spin" />
                Importing...
            </div>
        )
    }
    if (connection.exportStatus == AccountConnectionExportStatus.Running) {
        return <></>
    }
    return (
        <Button onClick={() => {
            refreshInstagramConnection(connection.id)
        }}>
            Refresh Instagram
        </Button>
    )
}
