import { Button } from "@/components/ui/button"
import Link from "next/link"
import { currentUser } from "../auth-actions"

export default async function Index() {
    let user = await currentUser()
    return (
        <div className="space-y-4">
            <div>Welcome back {user.firstName} {user.lastName} {user.credential}</div>
            <div>
                <div>
                    <Button asChild>
                        <Link href={`${process.env.TIKTOK_AUTHORIZE_URL}`}>
                            Click here to connect your TikTok account
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
