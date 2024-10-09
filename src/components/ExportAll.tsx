'use client'

import { exportAll } from "@/app/social-actions"
import { AccountConnection, AccountConnectionExportStatus, AccountConnectionImportStatus } from "@/gql/graphql"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

export default function ExportAll({ connection }: { connection: AccountConnection }) {
    if (connection.exportStatus == AccountConnectionExportStatus.Running) {
        return (
            <div className="bg-blue-500 p-2 rounded-md flex items-center gap-x-2">
                <Loader2 className="animate-spin" />
                Exporting...
            </div>
        )
    }
    if (connection.importStatus == AccountConnectionImportStatus.Running) {
        return <></>
    }
    return (
        <Button onClick={() => {
            exportAll(connection.id)
        }}>
            Export All
        </Button>
    )
}
